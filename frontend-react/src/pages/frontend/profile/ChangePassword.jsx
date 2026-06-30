import React, { useState } from 'react'
import { Link } from 'react-router';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { changeUserPassword } from '../../../services/userService';
import { profileChangePasswordSchema } from '../../../validations/frontend/profileValidation';

export default function ChangePassword() {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(profileChangePasswordSchema),
        mode: "onBlur",
    });

    const onSubmitHandler = async (data) => {
        try {
            const result = await changeUserPassword(data);
            if (result?.statusCode === 200 || result?.success === true) {
                toast.success(result?.message);
                setMessage(result?.message);
                setMessageType("success");
                reset();
            } else {
                const msg = result?.message || "Something went wrong";
                toast.error(msg);
                setMessage(msg);
                setMessageType("error");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
            setMessage(msg);
            setMessageType("error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Change Password
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Update your account password securely.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium">
                            Current Password
                        </label>
                        <input {...register("currentPassword")} name='currentPassword' type="password" placeholder="Enter current password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.currentPassword && (<p className="text-red-500 text-sm mt-1">{errors?.currentPassword.message} </p>)}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            New Password
                        </label>
                        <input {...register("newPassword")} name='newPassword' type="password" placeholder="Enter new password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.newPassword && (<p className="text-red-500 text-sm mt-1">{errors?.newPassword.message} </p>)}

                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm New Password
                        </label>
                        <input {...register("cNewPassword")} name='cNewPassword' type="password" placeholder="Confirm new password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.cNewPassword && (<p className="text-red-500 text-sm mt-1">{errors?.cNewPassword.message} </p>)}

                    </div>
                    <div className="flex gap-4 pt-2">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer">
                            Update Password
                        </button>
                        <Link to="/profile" className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg cursor-pointer">
                            Cancel
                        </Link>
                    </div>
                </form>
                {message && (
                    <div
                        className={`mt-6 p-4 rounded-lg border text-center ${messageType === "success"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                            }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}
