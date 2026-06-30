import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile } from "../../../services/userService";
import { profileUpdateSchema } from '../../../validations/frontend/profileValidation';

const defaultValues = { name: "", email: "", phone: "" };
export default function UpdateProfile() {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [userData, setUserData] = useState(defaultValues)

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(profileUpdateSchema),
        mode: "onBlur",
        defaultValues
    });

    const fetchProfile = async () => {
        const response = await getUserProfile();
        if (response?.success) {
            setUserData(response?.data)
            reset({
                name: response?.data?.name || "",
                email: response?.data?.email || "",
                phone: response?.data?.phone || ""
            });
        }
    };

    const profileUpdateSubmitHandler = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            if (data.image?.[0]) {
                formData.append(
                    "image",
                    data.image[0]
                );
            }
            const result = await updateUserProfile(formData);
            if (result?.statusCode === 200 || result?.success === true) {
                toast.success(result?.message);
                setMessage(result?.message);
                setMessageType("success");
                fetchProfile()
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

    useEffect(() => {
        fetchProfile();
    }, [reset]);


    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your personal information.
                    </p>
                </div>

                <form onSubmit={handleSubmit(profileUpdateSubmitHandler)} className="space-y-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-100 shadow">
                            <img src={userData?.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            Change Photo
                            <input name='image' type="file" accept="image/*" {...register("image")} type="file" className="hidden" />
                        </label>
                    </div>
                    <p className="text-red-500 text-sm"> {errors.image?.message} </p>

                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>
                        <input {...register("name")} name='name' type="text" placeholder="Enter full name" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.name && (<p className="text-red-500 text-sm mt-1">{errors?.name.message} </p>)}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Email Address
                        </label>
                        <input {...register("email")} readOnly name='email' type="email" placeholder="Enter email address" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.email && (<p className="text-red-500 text-sm mt-1">{errors?.email.message} </p>)}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Phone Number
                        </label>
                        <input {...register("phone")} name='phone' type="number" placeholder="Enter phone number" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        {errors.phone && (<p className="text-red-500 text-sm mt-1">{errors?.phone.message} </p>)}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer">
                            Update Profile
                        </button>
                        <Link to="/profile" className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
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
