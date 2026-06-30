import * as yup from "yup";

export const newsLetterSchema = yup.object({
    email: yup
        .string()
        .required("The Newsletter Email is required")
        .email("The Newsletter Email address is invalid")
});