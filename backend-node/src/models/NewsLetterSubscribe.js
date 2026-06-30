import mongoose from "mongoose";
const newsLetterSubscribeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        unSubscribedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("NewsLetterSubscribe", newsLetterSubscribeSchema);