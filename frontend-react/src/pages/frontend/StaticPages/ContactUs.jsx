import { use, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { submitContactUs } from "../../../services/homeService";
import { contactSchema } from '../../../validations/frontend/contactValidation';

export default function ContactUs() {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(contactSchema),
        mode: "onBlur",
    });

    const onSubmitHandler = async (data) => {
        try {
            const result = await submitContactUs(data);
            if (result?.statusCode === 200 || result?.success === true) {
                toast.success(result?.message);
                reset();
            } else {
                toast.error(result?.message || 'Something went wrong');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8">
                Contact Us
            </h1>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Get In Touch
                    </h3>
                    <p className="mb-3">
                        📍 Indore, Madhya Pradesh, India
                    </p>
                    <p className="mb-3">
                        📧 support@dailyshopee.com
                    </p>
                    <p>
                        📞 +91 1234567890
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Your Name"
                        className={`w-full border rounded-lg p-3 ${errors.name
                            ? "border-red-500"
                            : "border-slate-300"
                            }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Your Email"
                        className={`w-full border rounded-lg p-3 ${errors.email
                            ? "border-red-500"
                            : "border-slate-300"
                            }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        {...register("message")}
                        className={`w-full border rounded-lg p-3 ${errors.message
                            ? "border-red-500"
                            : "border-slate-300"
                            }`}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                        </p>
                    )}
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}
