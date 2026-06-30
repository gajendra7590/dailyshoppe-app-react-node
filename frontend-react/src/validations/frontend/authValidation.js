import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string()
        .required("Full Name is required")
        .min(3, "Full Name must be at least 3 characters")
        .max(100, "Full Name cannot exceed 100 characters"),
    email: Yup.string()
        .required("Email Address is required")
        .email("Please enter a valid email address"),
    phone: Yup.string()
        .required("Phone Number is required")
        .matches(
            /^[6-9]\d{9}$/,
            "Please enter a valid 10 digit mobile number"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character"
        ),
    cpassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
            [Yup.ref("password")],
            "Passwords must match"
        ),

});

export const loginSchema = Yup.object({
    email: Yup.string()
        .required("Email Address is required")
        .email("Please enter a valid email address"),
    password: Yup.string()
        .required("Password is required")

});