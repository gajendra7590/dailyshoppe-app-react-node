import * as yup from "yup";

export const addCategoryValidation = yup.object({
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

export const editCategoryValidation = yup.object({
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
