import multer from 'multer';
import { resultCode200, resultCode400, resultCode500, resultCode401, resultCode404 } from '../../utils/responseHandler.js';
import User from '../../models/User.js';
import { validationResult } from "express-validator";
import { getFullURL } from '../../utils/commonUtility.js';


export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "_id", sortOrder = "desc", status = "", role = "" } = req.query;

        const query = {};

        // Search
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        // Status Filter
        if (status !== "") {
            query.isActive = status === "true";
        }

        // Role Filter
        if (role !== "") {
            query.role = role;
        }

        const sort = {
            [sortBy]: sortOrder === "asc" ? 1 : -1
        };

        const skip = (Number(page) - 1) * Number(limit);
        const [users, total] = await Promise.all([
            User.find(query).select("name email phone avatar isActive createdAt ")
                .populate('role', 'name')
                .sort(sort).skip(skip).limit(Number(limit)).lean(),
            User.countDocuments(query)
        ]);

        const data = users.map(user => ({
            ...user,
            avatar: getFullURL(user?.avatar, "userProfile")
        }));
        return resultCode200(res, "Users retrieved successfully.", {
            perPage: Number(limit),
            currentPage: Number(page),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            users: data
        });
    } catch (error) {
        console.log(error);
        return resultCode500(res, error);
    }
};

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const getCategory = await Category.findById(id);
        if (!getCategory) {
            return resultCode404(res, 'Invalid Category ID');
        }
        const getCategoryDetail = {
            ...getCategory.toObject(),
            image: getFullURL(getCategory?.image, 'categories')
        }
        return resultCode200(res, "Category detail retrieved succcessfully", getCategoryDetail);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const createUser = async (req, res) => {
    try {
        const createdData = req.body;
        if (!req.file) {
            return resultCode400(res, "Please upload an image", "validation failed.")
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const imagePath = req.file.filename;
        const insertData = { ...createdData, image: imagePath, createdBy: req.user._id };
        const newCategory = await Category.create(insertData);
        return resultCode200(res, "Category created successfully", newCategory);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error?.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const getCategory = await Category.findById(id);
        if (!getCategory) {
            return resultCode404(res, 'Invalid Category ID');
        }
        var updateData = req.body;
        if (req.file) {
            updateData = { ...updateData, image: req.file.filename }
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            updateData, { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return resultCode400(res, "Facing error in updating category.")
        }
        return resultCode200(res, "Category Updated Successfully Done", updatedCategory)
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const getCategory = await Category.findById(id);
        if (!getCategory) {
            return resultCode404(res, 'Invalid Category ID');
        }
        const deleteCat = await Category.findOneAndDelete({ _id: id });
        if (!deleteCat) {
            return resultCode400(res, "Facing issue in deleting");
        }
        return resultCode200(res, "Deleted Successfully");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}
