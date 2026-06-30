import { resultCode200, resultCode400, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import Category from '../../models/Category.js';
import Product from '../../models/Product.js';
import { getFullURL } from '../../utils/commonUtility.js';


export const homeTopCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('_id name slug').sort({ createdAt: -1 }).limit(10).lean();
        return resultCode200(res, "Retrieved Successfully.", categories);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const shopByCategory = async (req, res) => {
    try {
        const categories = await Category.find().select('_id name slug image').sort({ createdAt: 1 }).limit(4).lean();
        const BASE_URL = `${req.protocol}://${req.get("host")}`;
        const data = categories.map((category) => ({
            ...category,
            image: getFullURL(category?.image, 'categories'),
        }));
        return resultCode200(res, "Retrieved Successfully.", data);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const filterByCategories = async (req, res) => {
    try {

        const categories = await Category.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "products"
                }
            },
            {
                $addFields: {
                    productCount: {
                        $size: "$products"
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    productCount: 1
                }
            },
            {
                $sort: {
                    productCount: -1,
                    name: 1
                }
            }
        ]);

        return resultCode200(
            res,
            "Categories Retrieved Successfully.",
            categories
        );

    } catch (error) {

        console.log(error);

        return resultCode500(res, error);

    }
};