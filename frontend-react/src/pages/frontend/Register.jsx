import { use, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Loader from '../../components/common/Loader';
import { registerSchema } from '../../validations/frontend/authValidation';
import { registerSubmit } from '../../services/authService';

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseType, setResponseType] = useState('');

    const { register, handleSubmit, reset, formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: { name: "", email: "", phone: "", password: "", cpassword: "", }
    });

    const submitHandler = async (data) => {
        try {
            setLoading(true)
            const regSubmitRes = await registerSubmit(data);
            console.log('regSubmitRes', regSubmitRes)
            if (regSubmitRes?.success === true) {
                toast.success(regSubmitRes?.message);
                reset();
                setLoading(false)
                //setTimeout(() => { navigate("/login"); }, 1000)
                setResponseMessage(regSubmitRes?.message)
                setResponseType('success')
            } else {
                setLoading(false)
                const msg = regSubmitRes?.message || "Something went wrong";
                toast.error(msg);
                setResponseMessage(msg)
                setResponseType('error')
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
            setResponseMessage(msg)
            setResponseType('error')
            setLoading(false)
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Create Account
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Register to start shopping
                    </p>
                </div>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Full Name</label>
                        <input {...register("name")} name='name' type="text" placeholder="Enter full name" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.name?.message}</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium"> Email Address</label>
                        <input {...register("email")} name='email' type="email" placeholder="Enter email" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.email?.message}</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Phone Number</label>
                        <input {...register("phone")} name='phone' type="text" placeholder="Enter mobile number" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.phone?.message}</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Password</label>
                        <input {...register("password")} name='password' type="password" placeholder="Enter password" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.password?.message}</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Confirm Password</label>
                        <input {...register("cpassword")} name='cpassword' type="password" placeholder="Confirm password" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-red-500 text-sm">{errors?.cpassword?.message}</p>
                    </div>
                    <button disabled={loading ? true : false} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {loading ? 'Registering, Pleas Wait...' : 'Create Account'}
                    </button>
                </form>

                {responseMessage && (

                    <div
                        className={`mt-4 p-3 rounded-lg text-sm text-center ${responseType === "success"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {responseMessage}
                    </div>

                )}
                <div className="mt-6 text-center">
                    <span className="text-slate-600">
                        Already have an account?
                    </span>
                    <Link to="/login" className="ml-2 text-blue-600 font-medium">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
