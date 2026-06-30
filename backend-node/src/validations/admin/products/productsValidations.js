import { body } from "express-validator";

export const createProductValidation = [
    body("name")
        .notEmpty()
        .withMessage("The product name field is required."),
    body("category")
        .notEmpty()
        .withMessage("The product category field is required."),
    body("description")
        .notEmpty()
        .withMessage("The product description field is required."),
    body("shortDescription")
        .optional()
        .isString().withMessage("The product description field is required."),
    body("sku")
        .notEmpty().withMessage("The product SKU field is required."),
    body("price")
        .notEmpty().withMessage("The product price field is required.")
        .isNumeric().withMessage("The product price should valid number.")
        .isFloat({ min: 1 }).withMessage("price must be at least 1."),
    body("salePrice")
        .notEmpty().withMessage("The product salePrice field is required.")
        .isNumeric().withMessage("The product salePrice should valid number.")
        .isFloat({ min: 1 }).withMessage("salePrice must be at least 1."),
    body("stock")
        .notEmpty().withMessage("The product stock field is required.")
        .isInt({ min: 1 }).withMessage("Stock must be at least 1."),
    body("isFeatured")
        .optional()
        .isBoolean().withMessage("The Is featured field is required."),
    body("isActive")
        .optional()
        .isBoolean().withMessage("The Is Active field is required."),
    body("metaTitle")
        .optional()
        .isString().withMessage("The Meta Title field is required."),
    body("metaDescription")
        .optional()
        .isString().withMessage("The Meta Description field is required.")
];



export const updateProductValidation = [
    body("name")
        .optional()
        .isString().withMessage("The product name field is required."),
    body("category")
        .optional()
        .isString().withMessage("The product category field is required."),
    body("description")
        .optional()
        .isString().withMessage("The product description field is required."),
    body("shortDescription")
        .optional()
        .isString().withMessage("The product description field is required."),
    body("sku")
        .optional()
        .isString().withMessage("The product SKU field is required."),
    body("price")
        .optional()
        .isNumeric().withMessage("The product price should valid number.")
        .isFloat({ min: 1 }).withMessage("price must be at least 1."),
    body("salePrice")
        .optional()
        .isNumeric().withMessage("The product salePrice should valid number.")
        .isFloat({ min: 1 }).withMessage("salePrice must be at least 1."),
    body("stock")
        .optional()
        .isInt({ min: 1 }).withMessage("Stock must be at least 1."),
    body("isFeatured")
        .optional()
        .isBoolean().withMessage("The Is featured field is required."),
    body("isActive")
        .optional()
        .isBoolean().withMessage("The Is Active field is required."),
    body("metaTitle")
        .optional()
        .isString().withMessage("The Meta Title field is required."),
    body("metaDescription")
        .optional()
        .isString().withMessage("The Meta Description field is required.")
];