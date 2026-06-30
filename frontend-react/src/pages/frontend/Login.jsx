import { use, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import { loginSchema } from '../../validations/frontend/authValidation';
import { loginSubmit } from '../../services/authService';

export default function Login() {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",          // validate on change
        reValidateMode: "onChange",
        defaultValues: { email: "", password: "" }
    });

    const loginSubmitHandler = async (data) => {
        try {
            const logRes = await loginSubmit(data);
            if (logRes?.success === true) {
                toast.success(logRes?.message);
                localStorage.setItem("token", logRes.data.token);
                localStorage.setItem("user", JSON.stringify(logRes.data.userData));
                setMessage(logRes?.message);
                setMessageType("success");
                setTimeout(() => {
                    window.location.href = '/profile'
                }, 1000);
            } else {
                const msg = logRes?.message || "Something went wrong";
                toast.error(msg);
                localStorage.setItem("token", "");
                setMessage(msg);
                setMessageType("error");
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
            localStorage.setItem("token", "");
            setMessage(msg);
            setMessageType("error");
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Login to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit(loginSubmitHandler)} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Email Address
                        </label>
                        <input {...register("email")} name='email' placeholder="Enter email" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.email?.message}</p>

                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium"> Password</label>
                        <input {...register("password")} name='password' type="password" placeholder="Enter password" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.password?.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="button" className="text-blue-600 text-sm">
                            Forgot Password?
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                        Login
                    </button>
                </form>
                {message && (
                    <div
                        className={`mt-4 p-3 rounded-lg text-sm text-center border ${messageType === "success"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                            }`}
                    >
                        {message}
                    </div>
                )}
                <div className="mt-6 text-center">
                    <span className="text-slate-600">
                        Don't have an account?
                    </span>
                    <Link to="/register" className="ml-2 text-blue-600 font-medium">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}
