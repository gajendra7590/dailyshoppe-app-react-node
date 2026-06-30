import { resultCode200, resultCode400, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import Product from '../../models/Product.js';
import { getFullURL } from '../../utils/commonUtility.js';

export const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 3, search = "", sortBy = "_id", sortOrder = "desc", categoryId = '' } = req.query;
        const query = {};
        ///SEARCH BY
        if (search) {
            query.name = { $regex: search, $options: "i", };
        }

        if (categoryId) {
            query.category = categoryId;
        }
        //SHORT BY
        const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1, };
        const skip = (Number(page) - 1) * Number(limit);
        const [products, total] = await Promise.all([
            Product.find(query).select('_id name price salePrice slug image').sort(sort).skip(skip).limit(Number(limit)).lean(),
            Product.countDocuments(query),
        ]);
        const BASE_URL = `${req.protocol}://${req.get("host")}`;
        const data = products.map((product) => ({
            ...product,
            image: getFullURL(product?.image, 'products'),
        }));
        return resultCode200(res, "Product list retrieved successfully", { perPage: limit, currentPage: page, totalCount: total, products: data });

    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const featuredProducts = async (req, res) => {
    try {
        const products = await Product.find().select('_id name price salePrice slug image').sort({ createdAt: 1 }).limit(4).lean();
        const data = products.map((product) => ({
            ...product,
            image: getFullURL(product?.image, 'products'),
        }));
        return resultCode200(res, "Retrieved Successfully.", data);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const productDetail = async (req, res) => {
    try {
        const { productId } = req.params;
        const productDetail = await Product.findById(productId)
            .select('_id name slug image price salePrice stock sku description')
            .populate('category', '_id name');
        const pDetail = {
            ...productDetail.toObject(), image: getFullURL(productDetail?.image, 'products')
        }
        return resultCode200(res, "Retrieved Successfully.", pDetail);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}