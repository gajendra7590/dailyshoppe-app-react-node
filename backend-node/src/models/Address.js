import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    fullName: String,

    mobile: String,

    alternateMobile: String,

    addressLine1: String,

    addressLine2: String,

    landmark: String,

    city: String,

    state: String,

    country: {
        type: String,
        default: "India"
    },

    postalCode: String,

    addressType: {
        type: String,
        enum: [
            "Home",
            "Office",
            "Other"
        ],
        default: "Home"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "Address",
    addressSchema
);