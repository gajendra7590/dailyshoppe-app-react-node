import { resultCode200, resultCode400, resultCode404, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import Category from '../../models/Category.js';
import Product from '../../models/Product.js';
import { validationResult } from 'express-validator';
import path from 'path';
import { getFullURL } from '../../utils/commonUtility.js';

export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", sortBy = "_id", sortOrder = "desc", searchByCat = '', searchByStatus = '', searchByFeatured = '' } = req.query;
        const query = {};
        ///SEARCH BY
        if (search) {
            query.name = { $regex: search, $options: "i", };
        }

        if (searchByStatus) {
            query.isActive = (searchByStatus === 'true');
        }

        if (searchByFeatured) {
            query.isFeatured = (searchByFeatured === 'true');
        }

        if (searchByCat) {
            query.category = searchByCat;
        }

        //SHORT BY
        const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1, };
        const skip = (Number(page) - 1) * Number(limit);
        const [products, total] = await Promise.all([
            Product.find(query).select('name price salePrice stock image isFeatured isActive createdAt')
                .populate('category', 'name')
                .sort(sort).skip(skip).limit(Number(limit)).lean(),
            Product.countDocuments(query),
        ]);

        const totalPages = Math.ceil(total / Number(limit));

        const BASE_URL = `${req.protocol}://${req.get("host")}`;
        const data = products.map((product) => ({
            ...product,
            image: getFullURL(product?.image, 'products')
        }));
        return resultCode200(res, "Product list retrieved successfully", { perPage: limit, currentPage: page, totalPages: totalPages, products: data });
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        var getProduct = await Product.findById(id);
        if (!getProduct) {
            return resultCode404(res, 'Invalid Product ID');
        }


        getProduct = { ...getProduct.toObject(), image: getFullURL(getProduct?.image, 'products') }
        return resultCode200(res, "Product detail retrieved succcessfully", getProduct);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const createProduct = async (req, res) => {
    try {
        var createdData = req.body;
        if (!req.file) {
            return resultCode400(res, "Please upload an image", "validation failed.")
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        createdData = { ...createdData, image: req.file.filename, createdBy: req.user._id };

        const newProduct = await Product.create(createdData);
        return resultCode200(res, "Product created successfully", newProduct);

    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const getProduct = await Product.findById(id);
        if (!getProduct) {
            return resultCode404(res, 'Invalid Product ID');
        }
        var updateData = req.body;
        if (req.file) {
            updateData = { ...updateData, image: req.file.filename }
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            updateData, { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return resultCode400(res, "Facing error in updating Product.")
        }
        return resultCode200(res, "Product Updated Successfully Done", updatedProduct)
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const getProduct = await Product.findById(id);
        if (!getProduct) {
            return resultCode404(res, 'Invalid Product ID');
        }
        const deleteProduct = await Product.findOneAndDelete({ _id: id });
        if (!deleteProduct) {
            return resultCode400(res, "Facing issue in deleting Product");
        }
        return resultCode200(res, "Product Deleted Successfully");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
} 