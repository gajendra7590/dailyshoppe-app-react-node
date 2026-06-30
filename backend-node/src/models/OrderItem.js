import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    productSlug: {
        type: String
    },

    productImage: {
        type: String
    },

    productPrice: {
        type: Number,
        required: true
    },

    productSalePrice: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    shippingCost: {
        type: Number,
        default: 0
    },

    discount: {
        type: Number,
        default: 0
    },

    subTotal: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "OrderItem",
    orderItemSchema
);