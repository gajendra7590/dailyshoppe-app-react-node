import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
        discountCoupen: {
            type: String,
            required: false,
            default: ""
        },
        extraDiscount: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        },
        shippingCost: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);
export default mongoose.model("CartItem", cartItemSchema);