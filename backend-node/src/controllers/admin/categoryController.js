import multer from 'multer';
import { resultCode200, resultCode400, resultCode500, resultCode401, resultCode404 } from '../../utils/responseHandler.js';
import Category from '../../models/Category.js';
import { validationResult } from "express-validator";
import { getFullURL } from '../../utils/commonUtility.js';


export const getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "_id", sortOrder = "desc", status = true } = req.query;
        const query = {};
        ///SEARCH BY
        if (search) {
            query.name = { $regex: search, $options: "i", };
        }

        if (status !== '') {
            query.isActive = (status === 'true');
        }
        //SHORT BY
        const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1, };
        const skip = (Number(page) - 1) * Number(limit);
        const [categories, total] = await Promise.all([
            Category.find(query).sort(sort).skip(skip).limit(Number(limit)).lean(),
            Category.countDocuments(query),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        const data = categories.map((category) => ({
            ...category,
            image: getFullURL(category?.image, 'categories')
        }));
        return resultCode200(res, "Categories list retrieved successfully", { perPage: limit, currentPage: page, totalPages: totalPages, categories: data });
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const getCategory = async (req, res) => {
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

export const createCategory = async (req, res) => {
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

export const updateCategory = async (req, res) => {
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

export const deleteCategory = async (req, res) => {
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

export const getCategoryDropDown = async (req, res) => {
    try {
        const catResult = await Category.find().select("name").sort({ 'name': 1 });
        return resultCode200(res, "Get All Categories Successfully", catResult);
    } catch (error) {
        console.log('error', error)
        return resultCode500(res, error);
    }
}