import { use, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { submitSubscribeNewsLetter } from "../../../services/homeService";
import { newsLetterSchema } from '../../../validations/frontend/newsLetterValidation';

export default function NewsLetterSection() {

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(newsLetterSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        const result = await submitSubscribeNewsLetter(data);
        if (result?.statusCode === 200 || result?.success === true) {
            toast.success(result?.message);
            reset();
        } else {
            toast.error(result?.message);
        }
    };


    return (
        <section className="bg-slate-900 text-white rounded-3xl p-10">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold"> Subscribe To Our Newsletter </h2>
                <p className="mt-4 text-slate-300"> Get latest offers and product updates. </p>
                <div className="flex mt-8 gap-3">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8"
                    >
                        <div className="flex flex-col md:flex-row gap-3 items-start">

                            <div className="flex-1 w-full">

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("email")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-black"
                                />

                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}

                            </div>

                            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </section >
    )
}
