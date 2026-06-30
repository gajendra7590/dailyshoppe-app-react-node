import { body } from "express-validator";

export const updateProfileValidation = [
    body("name")
        .notEmpty()
        .withMessage("The name field is required."),
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("The email field is required."),
    body("phone")
        .notEmpty()
        .withMessage("The phone number field is required.")
        .isNumeric()
        .withMessage("The phone number has valid number.")
];

export const updatePasswordValidation = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required."),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required.")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters."),

    body("cNewPassword")
        .notEmpty()
        .withMessage("Confirm password is required.")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Confirm password does not match.");
            }
            return true;
        }),

];
