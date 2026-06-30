import User from "../../models/User.js";
import Role from '../../models/Role.js';
import bcrypt from "bcryptjs";

import { resultCode200, resultCode400, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import { validationResult } from "express-validator";
import fs from "fs";
import { getFullURL } from '../../utils/commonUtility.js';


export const getProfile = async (req, res) => {
    try {
        const userModel = await User.findById(req.user._id).select('name email phone isActive avatar createdAt').populate('role', 'name isActive');
        const userProfileDetail = {
            ...userModel.toObject(),
            avatar: getFullURL(userModel?.avatar, 'userProfile')
        }
        return resultCode200(res, "Profile detail retrieved successfully.", userProfileDetail);
    } catch (error) {
        return resultCode500(res, error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //REMOVE UPLOADED FILE
            if (req.file?.path) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.log("File delete error:", err);
                    }
                });
            }
            return resultCode400(res, "Validation failed", errors.array());
        }

        var profileData = req.body;
        if (req.file) {
            profileData = { ...profileData, avatar: `${req.file.filename}` };
        }
        const user = await User.findByIdAndUpdate(
            req.user._id,
            profileData,
            {
                returnDocument: "after"
            }
        );
        return resultCode200(res, "Profile updated successfully", user);
    } catch (error) {
        if (req.file?.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log("File delete error:", err);
                }
            });
        }
        if (error?.errors?.password?.name == 'ValidatorError') {
            return resultCode400(res, error.message);
        }
        return resultCode500(res, error.errors.password.name);
    }
};

export const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return resultCode401(res, 'User not found.')
        }
        const isMatch = await bcrypt.compare(currentPassword.toString(), user.password);
        if (!isMatch) {
            return resultCode400(res, "Current password is incorrect.");
        }
        user.password = await bcrypt.hash(newPassword.toString(), 10);
        await user.save();
        return resultCode200(res, "Your password changed successfully.");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}; 