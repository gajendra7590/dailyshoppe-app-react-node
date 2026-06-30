import { body } from "express-validator";

export const loginValidation = [
    body("email")
        .notEmpty()
        .withMessage("The email field is required.")
        .isEmail()
        .withMessage('Enter valid email address.'),
    body("password")
        .notEmpty()
        .withMessage("The password field is required.")
];



export const registrationValidation = [
    body("name")
        .notEmpty()
        .withMessage("The name field is required."),
    body("email")
        .notEmpty()
        .withMessage("The email field is required.")
        .isEmail()
        .withMessage('Enter valid email address.'),
    body("password")
        .notEmpty()
        .withMessage("The password field is required."),
    body("phone")
        .notEmpty()
        .withMessage("The phone number field is required."),
];

export const accountVerifyValidation = [
    body("token")
        .notEmpty()
        .withMessage("Your account link is expire or invalid.")
];