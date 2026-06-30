import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../../models/User.js";
import Role from '../../models/Role.js'
import generateToken from "../../utils/generateToken.js";
import { resultCode200, resultCode400, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import { validationResult } from "express-validator";
import { sendVerificationEmail } from "../../utils/sendEmail.js";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
export const register = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const { name, email, password, phone } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resultCode400(res, "User already exists");
        }
        const hashedPassword = await bcrypt.hash(password.toString(), 10);

        //CHECK ROLE OF CUSTOMER IS SYNCED OR NOT
        const userRole = await Role.findOne({ name: "customer" });
        if (!userRole) {
            return resultCode400(res, "Customer role is not synced, try later.");
        }

        const verificationToken = crypto.randomBytes(16).toString("hex");
        const user = await User.create({ name, email, phone, password: hashedPassword, role: userRole._id, verificationToken });
        if (!user) {
            return resultCode400(res, "Sorry! Facing some issue in registration, try later.");
        }

        const verificationUrl = process.env.CLIENT_URL + '/email-verification?token=' + verificationToken;
        //EMAIL SENT
        await sendVerificationEmail({ name, email, verificationUrl });
        const userModel = await User.findById(user._id).select('name email phone').populate('role', 'name isActive');
        return resultCode200(res, "Thank you for joining us, your account created & verification email sent. please verify your account");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
export const login = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const { email, password, isAdmin } = req.body;
        const user = await User.findOne({ email }).select('password').populate('role', 'name isActive');
        if (!user) {
            return resultCode400(res, "Email is not exist with us.");
        }

        if ((isAdmin === true && user.role?.name == 'customer')) {
            return resultCode401(res, "UnAuthorised Access.");
        }

        const isMatch = await bcrypt.compare(password.toString(), user.password);
        if (!isMatch) {
            return resultCode400(res, "Invalid credentials.");
        }
        const fetchUserData = await User.findOne({ email }).select('name email phone isActive avatar').populate('role', 'name isActive');
        const userData = { ...fetchUserData.toObject(), avatar: fetchUserData.avatar ? `${process.env.APP_URL}/uploads/${fetchUserData.avatar}` : null };
        return resultCode200(res, "User registered successfully", { userData, token: generateToken(userData) });
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
};

/*
|--------------------------------------------------------------------------
| Account Verify
|--------------------------------------------------------------------------
*/
export const accountVerify = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const { token } = req.body;
        const user = await User.findOne({ verificationToken: token }).select('_id, email isActive isAccountConfirmed isAccountConfirmedDate verificationToken');
        if (!user) {
            return resultCode400(res, "Sorry! Your token got expired or invalid.");
        }

        if (user?.isActive === true || user?.isAccountConfirmed === true) {
            return resultCode400(res, "Your account is already verified.");
        }

        const updateRes = await User.updateOne(
            { _id: user._id },
            { $set: { isActive: true, isAccountConfirmed: true, isAccountConfirmedDate: new Date(), verificationToken: null }, }
        );
        return resultCode200(res, "User Account Verified Successfully");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
};