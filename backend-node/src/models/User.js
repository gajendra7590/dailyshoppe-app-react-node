import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    avatar: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAccountConfirmed: {
        type: Boolean,
        default: false
    },
    isAccountConfirmedDate: {
        type: Date,
        default: null
    },
    verificationToken: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});
export default mongoose.model("User", userSchema);