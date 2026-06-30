import { body } from "express-validator";

export const addToCartValidation = [
    body("productId")
        .notEmpty()
        .withMessage("Product is required."),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    body("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount must be a valid number."),

    body("discountCoupon")
        .optional()
        .isString()
        .withMessage("Discount coupon must be a valid string.")
];

export const updateCartValidation = [
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 0 })
        .withMessage("Quantity must be at least 1."),
    body("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount must be a valid number."),
    body("discountCoupon")
        .optional()
        .isString()
        .withMessage("Discount coupon must be a valid string.")
];

export const deleteCartValidation = [
    body("cartItemId")
        .notEmpty()
        .withMessage("Cart item is required.")
        .isMongoId()
        .withMessage("Invalid cart item id.")
];