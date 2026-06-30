import { Link } from "react-router";
import { logout } from "../../../utils/auth";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Logout() {
    useEffect(() => {
        logout();
        toast.success('You have been logged out successfully.')
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
    }, []);

    return (
        <div className="py-16">
            <div className="max-w-md mx-auto bg-white shadow rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-3xl text-green-600">
                        ✓
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Logged Out Successfully
                </h1>
                <p className="text-gray-600 mb-6">
                    You have been successfully logged out from your account.
                </p>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-sm text-gray-500">
                    Redirecting to login page...
                </p>
            </div>
        </div>
    );
}