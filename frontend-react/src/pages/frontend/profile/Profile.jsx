import React, { use } from "react";
import { getUserProfile } from "../../../services/userService";
import { Link } from "react-router";

const getUserProfileAync = getUserProfile();
export default function Profile() {
    const userProfile = use(getUserProfileAync);
    const getInitials = (name = "") => {
        const parts = name.trim().split(" ");
        if (parts.length > 1) {
            return (
                parts[0][0] +
                parts[1][0]
            ).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const capitalizeName = (name = "") => {
        return name
            .split(" ")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1).toLowerCase()
            )
            .join(" ");
    };
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Cover */}
                <div className="h-40 bg-blue-600"></div>

                {/* Profile Section */}
                <div className="px-8 pb-8">

                    <div className="flex flex-col items-center -mt-16">

                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">

                            {userProfile?.data?.avatar ? (
                                <img
                                    src={userProfile?.data?.avatar}
                                    alt={userProfile?.data?.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl font-semibold text-gray-700">
                                    {getInitials(userProfile?.data?.name)}
                                </div>
                            )}

                        </div>

                        <h1 className="mt-4 text-3xl font-bold text-gray-800">
                            {capitalizeName(userProfile?.data?.name)}
                        </h1>

                        <p className="text-gray-500">
                            {userProfile?.data?.email}
                        </p>

                        <span className="mt-3 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Active Account
                        </span>

                    </div>

                    {/* Information Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        <div className="bg-gray-50 rounded-xl p-6 border">
                            <h3 className="text-xl font-semibold mb-5">
                                Personal Information
                            </h3>

                            <div className="space-y-3">
                                <p><strong>Full Name : </strong>{capitalizeName(userProfile?.data?.name)}</p>
                                <p><strong>Email : </strong> {userProfile?.data?.email}</p>
                                <p><strong>Phone : </strong> +91 {userProfile?.data?.phone}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border">
                            <h3 className="text-xl font-semibold mb-5">
                                Account Details
                            </h3>

                            <div className="space-y-3">
                                <p><strong>User ID : </strong>{userProfile?.data?._id}</p>
                                <p><strong>Role : </strong> {capitalizeName(userProfile?.data?.role?.name)} </p>
                                <p><strong>Member Since : </strong> {new Date(userProfile?.data?.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}</p>
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <Link to="/profile-update" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer">
                            Edit Profile
                        </Link>
                        <Link to="/change-password" className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg cursor-pointer">
                            Change Password
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}