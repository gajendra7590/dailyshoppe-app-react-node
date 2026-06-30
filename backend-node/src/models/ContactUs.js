import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
            email: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("ContactUs", contactUsSchema);