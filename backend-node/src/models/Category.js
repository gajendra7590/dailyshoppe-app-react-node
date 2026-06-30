import mongoose from "mongoose";
import slugify from 'slugify';


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        image: {
            type: String,
            default: null,
        },
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
        sortOrder: {
            type: Number,
            default: 0,
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
            default: null,
        },
        seoTitle: {
            type: String,
            default: "",
        },
        seoDescription: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.pre('save', async function () {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, {
            lower: true,      // Convert to lowercase
            strict: true,     // Strip special characters
            trim: true        // Trim spaces
        });
    }
    // No next() needed here; Mongoose handles it automatically
});

categorySchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    if (update.name) {
        update.slug = slugify(update.name, {
            lower: true,
            strict: true,
        });
    }
});

// categorySchema.index({ name: 1 });
// categorySchema.index({ slug: 2 });
// categorySchema.index({ parentCategory: 3 });

export default mongoose.model("Category", categorySchema);