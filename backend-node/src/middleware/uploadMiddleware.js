import multer from "multer";
import path from "path";
import fs from "fs";

export const upload = (folder = "common") => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(
                process.cwd(),
                "uploads",
                folder
            );

            fs.mkdirSync(uploadPath, {
                recursive: true,
            });

            cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
            const uniqueSuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);

            cb(
                null,
                `${file.fieldname}-${uniqueSuffix}${path.extname(
                    file.originalname
                )}`
            );
        },
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed!"), false);
        }
    };

    return multer({
        storage,
        fileFilter,
    });
};