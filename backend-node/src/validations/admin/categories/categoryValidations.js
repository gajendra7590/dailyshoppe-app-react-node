import { body } from "express-validator";

export const createCategoryValidation = [
    body("name")
        .notEmpty()
        .withMessage("The name field is required."),

    body("description")
        .notEmpty()
        .withMessage("The description field is required.")
];



export const updateCategoryValidation = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("The name field is required."),

    body("description")
        .optional()
        .notEmpty()
        .withMessage("The description field is required.")
];