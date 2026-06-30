import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        shortDescription: {
            type: String,
            default: "",
        },
        sku: {
            type: String,
            unique: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        salePrice: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        image:
        {
            type: String,
            required: true
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        metaTitle: {
            type: String,
            default: "",
        },
        metaDescription: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true
    }
);

productSchema.pre("save", function () {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }
});

productSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    if (update.name) {
        update.slug = slugify(update.name, {
            lower: true,
            strict: true,
        });
    }
});

export default mongoose.model("Product", productSchema);