import * as Yup from "yup";

export const profileChangePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .required("Current password is required."),
    newPassword: Yup.string()
        .required("New password is required.")
        .min(8, "New password must be at least 8 characters"),
    cNewPassword: Yup.string()
        .required("Confirm New Password is required")
        .oneOf(
            [Yup.ref("newPassword")],
            "Confirm new password must match the new password."
        )
});

export const profileUpdateSchema = Yup.object({
    image: Yup
        .mixed()
        .nullable()
        .test(
            "fileType",
            "Only JPG, JPEG, PNG and WEBP images are allowed",
            (value) => {
                if (!value?.[0]) {
                    return true; // No file selected
                }
                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp"
                ].includes(value[0].type);
            }
        ),
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
        )

}); 