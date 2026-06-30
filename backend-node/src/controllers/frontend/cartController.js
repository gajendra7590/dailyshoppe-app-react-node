import mongoose from "mongoose";
import { resultCode200, resultCode400, resultCode500, resultCode401, resultCode404 } from '../../utils/responseHandler.js';
import Cart from '../../models/Cart.js';
import CartItems from '../../models/CartItems.js';
import Product from '../../models/Product.js';
import User from '../../models/User.js';
import { validationResult } from 'express-validator';
import { getFullURL } from '../../utils/commonUtility.js';

export const getCartItems = async (req, res) => {
    try {
        // Find or Create Cart
        let userCart = await Cart.findOne({ userId: req.user._id });
        if (!userCart) {
            userCart = await Cart.create({ userId: req.user._id });
        }

        // Fetch Cart Items
        const items = await CartItems.find({ cartId: userCart._id })
            .select("_id cartId quantity discountCoupen extraDiscount shippingCost")
            .populate("productId", "name slug image price salePrice stock");
        let totalItems = 0;
        let subTotal = 0;
        let shippingTotal = 0;
        let extraDiscountTotal = 0;

        //PREPARING
        const cartItems = items.map(item => {
            const salePrice = item?.productId?.salePrice || 0;
            const quantity = item?.quantity || 1;
            const extraDiscount = item?.extraDiscount || 0;
            const shippingCost = item?.shippingCost || 0;
            const itemSubTotal = ((salePrice - extraDiscount) * quantity) + shippingCost;
            totalItems += quantity;
            subTotal += itemSubTotal;
            shippingTotal += shippingCost;
            extraDiscountTotal += extraDiscount;
            return {
                _id: item?._id,
                cartId: item?.cartId,
                product_id: item?.productId?._id,
                product_name: item?.productId?.name,
                product_price: item?.productId?.price,
                product_salePrice: item?.productId?.salePrice,
                product_stock: item?.productId?.stock,
                product_slug: item?.productId?.slug,
                product_image: item?.productId?.image ? getFullURL(item?.productId?.image, 'products') : null,
                cartItem_quantity: quantity,
                cartItem_discountCoupen: item?.discountCoupen || "",
                cartItem_extraDiscount: extraDiscount,
                cartItem_shippingCost: shippingCost,
                cartItem_itemSubTotal: Number(itemSubTotal.toFixed(2))
            };

        });

        const response = {
            totalItems,
            subTotal: Number(subTotal.toFixed(2)),
            extraDiscountTotal: Number(extraDiscountTotal.toFixed(2)),
            shippingTotal: Number(shippingTotal.toFixed(2)),
            grandTotal: Number((subTotal + shippingTotal).toFixed(2)),
            cartItems
        };
        return resultCode200(res, "Cart Retrieved Successfully.", response);
    } catch (error) {
        return resultCode500(res, error.message);
    }
};

export const getCartItemsCount = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: req.user._id });
        if (!userCart) {
            return resultCode200(res, "Cart count retrieved successfully.", { cartCount: 0 });
        }
        const cartCount = await CartItems.countDocuments({ cartId: userCart._id });
        return resultCode200(res, "Cart count retrieved successfully.", { cartCount });
    }
    catch (error) {
        return resultCode500(res, error.message);

    }
};

export const addToCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const reqData = req.body;

        //CHECK USER HAS CART
        var userCart = await Cart.findOne({ userId: req.user._id });
        if (!userCart) {
            userCart = await Cart.create({ userId: req.user._id });
        }

        //CHECK PRODUCT EXIST
        var productDetail = await Product.findOne({ _id: reqData.productId, isActive: true });
        if (!productDetail) {
            return resultCode400(res, "The product is not available at movement, try other one.");
        }

        if (productDetail?.stock <= 0 || productDetail?.stock < reqData.quantity) {
            return resultCode400(res, "The product stock is not available at movement, try other one.");
        }

        //NOW INSERT ITEM INTO CART ITEMS
        const userCartItemRes = await CartItems.findOne({ cartId: userCart._id, productId: reqData.productId });
        if (userCartItemRes) {
            return resultCode400(res, "The product is already added into cart, please try other one.");
        }

        let extraDiscount = 0; //CALCULATE LATER - in %

        //INSERT NEW CART ITEM
        const cartItemInsertData = {
            cartId: userCart?._id,
            productId: reqData?.productId,
            quantity: reqData?.quantity,
            discountCoupen: reqData?.discountCoupen,
            extraDiscount: extraDiscount
        }
        const cartItemRes = await CartItems.create(cartItemInsertData);
        if (!cartItemRes) {
            return resultCode500(res, "Facing some issue in add new item, please try later.");
        }
        return resultCode200(res, "Cart Item Added Successfully.", cartItemRes);
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const updateToCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }
        const reqData = req.body;
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return resultCode400(res, "Invalid cart item id.");
        }
        //CHECK USER HAS CART
        var userCartItem = await CartItems.findOne({ _id: req.params.id }).populate('productId', '_id name pprod');
        if (!userCartItem) {
            return resultCode400(res, "The cart id is invalid",);
        }

        if (reqData.quantity >= 1) {
            await CartItems.findByIdAndUpdate({ _id: req.params.id }, { quantity: reqData.quantity });
        } else {
            await CartItems.findByIdAndDelete({ _id: req.params.id });
        }
        return resultCode200(res, "Cart Item Updated Successfully.");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error?.error);
    }
}

export const deleteCartItems = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req?.params?.id)) {
            return resultCode400(res, "Invalid cart item id.");
        }

        const userCart = await Cart.findOne({ userId: req.user._id });
        if (!userCart) {
            return resultCode400(res, "Invalid Request",);
        }

        //CHECK USER HAS CART
        var userCartItem = await CartItems.findOne({ _id: req.params.id, cartId: userCart._id });
        if (!userCartItem) {
            return resultCode400(res, "The cart item id is invalid",);
        }

        await CartItems.findOneAndDelete({ _id: req.params.id })
        return resultCode200(res, "Cart Item Deleted Successfully.", req.body);
    } catch (error) {
        return resultCode500(res, error);
    }
}