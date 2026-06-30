import express from "express";
const router = express.Router();
import { tokenVeirfy } from "../../middleware/authMiddleware.js";
import { getCartItems, getCartItemsCount, addToCart, updateToCart, deleteCartItems } from "../../controllers/frontend/cartController.js";
import { addToCartValidation, updateCartValidation, deleteCartValidation } from '../../validations/frontend/cartValidation.js';
//CART
router.get("/cart/getCartItems", tokenVeirfy, getCartItems);
router.get("/cart/getCartItemsCount", tokenVeirfy, getCartItemsCount);
router.post("/cart/addToCart", tokenVeirfy, addToCartValidation, addToCart);
router.put("/cart/updateToCart/:id", tokenVeirfy, updateCartValidation, updateToCart);
router.delete("/cart/deleteCartItem/:id", tokenVeirfy, deleteCartItems);

export default router;