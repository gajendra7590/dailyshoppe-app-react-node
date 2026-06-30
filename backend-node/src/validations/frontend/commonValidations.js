import { body } from "express-validator";

export const saveContactUsValidation = [
    body("name")
        .notEmpty()
        .withMessage("The contact name field is required."),
    body("email")
        .notEmpty()
        .withMessage("The contact email field is required.")
        .isEmail()
        .withMessage('The contact contact field is invalid.'),
    body("message")
        .notEmpty()
        .withMessage("The contact message field is required.")
];

export const saveNewsLetterValidation = [
    body("email")
        .notEmpty()
        .withMessage("The newsletter email field is required.")
        .isEmail()
        .withMessage('The newsletter contact field is invalid.')
]; 