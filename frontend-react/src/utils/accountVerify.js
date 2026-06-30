export const accountVerifyConfig = {
    success: {
        icon: "✓",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        title: "Email Verified Successfully",
        description:
            "Your account has been verified successfully. You can now login and start shopping.",
        alertClass:
            "bg-green-50 border-green-200 text-green-700",
        alertText:
            "Account verification completed successfully.",
        buttonText: "Go To Login",
        buttonLink: "/login",
    },

    already_verified: {
        icon: "ℹ",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "Account Already Verified",
        description:
            "Your account has already been verified. Please login to continue.",
        alertClass:
            "bg-blue-50 border-blue-200 text-blue-700",
        alertText:
            "No action required. Your account is active.",
        buttonText: "Login",
        buttonLink: "/login",
    },

    error: {
        icon: "✕",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        title: "Verification Failed",
        description:
            "This verification link is invalid, expired, or no longer available.",
        alertClass:
            "bg-red-50 border-red-200 text-red-700",
        alertText:
            "Please request a new verification email.",
        buttonText: "Register Again",
        buttonLink: "/register",
    },
};