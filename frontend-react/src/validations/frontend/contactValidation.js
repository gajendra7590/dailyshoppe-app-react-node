import * as yup from "yup";

export const contactSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Minimum 3 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
    message: yup
        .string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(500, "Maximum 500 characters"),
});