import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    orderNumber: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },

    totalItems: {
        type: Number,
        default: 0
    },

    subTotal: {
        type: Number,
        default: 0
    },

    shippingCost: {
        type: Number,
        default: 0
    },

    discount: {
        type: Number,
        default: 0
    },

    grandTotal: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "RAZORPAY"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid",
            "Failed",
            "Refunded"
        ],
        default: "Pending"
    },

    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
            "Returned"
        ],
        default: "Pending"
    },

    couponCode: {
        type: String,
        default: ""
    },

    notes: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "Order",
    orderSchema
);