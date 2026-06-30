import { useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router';
import Loader from '../../../components/common/Loader';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { createAdminCategories, getOneAdminCategories, updateAdminCategories } from '../../../services/admin/adminCategoryService';
import { addCategoryValidation, editCategoryValidation } from '../../../validations/backend/adminCategoryValidation';
import { Link } from 'react-router';
import { useEffect } from 'react';

export default function AddUpdateCategory() {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver((id == undefined) ? addCategoryValidation : editCategoryValidation),
        mode: "onBlur",
    });

    const onSubmitCategoryForm = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "image" && !value?.[0]) return;
                formData.append(
                    key,
                    key === "image" ? value[0] : value
                );
            });

            let result = null;
            if (actionType == 'create') {
                result = await createAdminCategories(formData);
            } else {
                result = await updateAdminCategories(id, formData);
            }

            if (result?.statusCode === 200 || result?.success === true) {
                toast.success(result?.message);
                reset();
                navigate("/admin/categories");
            } else {
                toast.error(result?.message || 'Something went wrong');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    }

    const getCategoryDetail = async (id) => {
        const data = await getOneAdminCategories(id);
        reset({
            name: data?.data?.name,
            description: data?.data?.description,
            isActive: data?.data?.isActive,
            isFeatured: data?.data?.isFeatured
        });
        setImagePreview(data?.data?.image);
    }

    useEffect(() => {
        if (id || id != undefined) {
            setActionType('edit');
            getCategoryDetail(id)
        }
    }, []);

    return (
        <div className="w-full">
            {loading && <Loader />}
            <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">{actionType == 'create' ? 'Add Category' : 'Edit Category'}</h1>
                    <p className="text-gray-500 mt-2">

                        {actionType == 'create' ? 'Create a new' : 'modify'} category for your store.
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmitCategoryForm)} className="space-y-6">

                    {/* Category Name */}
                    <div>
                        <label className="block mb-2 font-medium">Category Name </label>
                        <input {...register("name")} name='name' type="text" placeholder="Enter category name" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.name?.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-medium">Description</label>
                        <textarea {...register("description")} name='description' rows="2" placeholder="Category description..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.description?.message}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Category Image
                        </label>
                        {imagePreview && (<img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border mb-4" />)}
                        <input {...register("image")} name='image' type="file" className="w-full border border-gray-300 rounded-lg px-4 py-3" />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.image?.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Status
                        </label>
                        <select {...register("isActive")} name='isActive' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        {errors.isActive && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.isActive?.message}
                            </p>
                        )}
                    </div>

                    {/* Is Featured */}
                    <div>
                        <label className="block mb-2 font-medium">Is Featured</label>
                        <select  {...register("isFeatured")} name='isFeatured' className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        {errors.isFeatured && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors?.isFeatured?.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-6">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer">
                            {actionType == 'create' ? 'Create' : 'Update'}
                        </button>
                        <Link to={'/admin/categories'} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer">Back</Link>
                    </div>
                </form>
                {message && (
                    <div
                        className={`mt-6 p-4 rounded-lg border text-center font-medium ${messageType === "success"
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
