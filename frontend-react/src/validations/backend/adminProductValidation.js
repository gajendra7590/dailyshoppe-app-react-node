import * as yup from "yup";

export const addProductValidation = yup.object({
    name: yup.string()
        .required("Name field is required"),
    category: yup
        .string()
        .required("Category field is required"),
    description: yup
        .string()
        .required("Description field is required"),
    shortDescription: yup
        .string()
        .required("shortDescription field is required"),
    sku: yup
        .string()
        .required("SKU field is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(0, "Price cannot be negative"),
    salePrice: yup
        .number()
        .typeError("salePrice must be a number")
        .required("salePrice is required")
        .min(0, "salePrice cannot be negative"),
    stock: yup
        .number()
        .typeError("stock must be a number")
        .required("stock is required")
        .min(0, "stock cannot be negative"),
    isFeatured: yup
        .boolean()
        .required("Is featured field is required"),
    isActive: yup
        .boolean()
        .required("Is active field is required"),
    image: yup.mixed()
        .nullable()
        .test(
            "fileType",
            "Only JPG, JPEG, PNG and WEBP files are allowed.",
            (value) => {

                if (!value || !value[0]) {
                    return true;
                }

                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp"
                ].includes(
                    value[0].type
                );

            }
        )
});

export const editProductValidation = yup.object({
    name: yup.string()
        .required("Name field is required"),
    description: yup
        .string()
        .required("Description field is required"),
    isFeatured: yup
        .boolean()
        .required("Is featured field is required"),
    isActive: yup
        .boolean()
        .required("Is active field is required"),
    image: yup.mixed()
        .nullable()
        .test(
            "fileType",
            "Only JPG, JPEG, PNG and WEBP files are allowed.",
            (value) => {

                if (!value || !value[0]) {
                    return true;
                }

                return [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp"
                ].includes(
                    value[0].type
                );

            }
        )
});
