import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import Loader from '../../../components/common/Loader';
import { createAdminProduct, getCategoryDropDown, getOneAdminProduct, updateAdminProduct } from '../../../services/admin/adminProductService';
import { addProductValidation, editProductValidation } from '../../../validations/backend/adminProductValidation';
import { create } from 'axios';



export default function AddEditProduct() {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCategoriesDropdown();
        if (id || id != undefined) {
            setActionType('edit');
            getProductDetail(id)
        }
    }, []);

    const getCategoriesDropdown = async () => {
        try {
            const response = await getCategoryDropDown();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getProductDetail = async (id) => {
        const data = await getOneAdminProduct(id);
        reset({
            name: data?.data?.name || "",
            category: data?.data?.category || "",
            description: data?.data?.description || "",
            shortDescription: data?.data?.shortDescription || "",
            sku: data?.data?.sku || "",
            price: data?.data?.price || 0.00,
            salePrice: data?.data?.salePrice ?? 0.00,
            stock: data?.data?.stock ?? 0,
            isFeatured: data?.data?.isFeatured ?? true,
            isActive: data?.data?.isActive ?? true,
            metaTitle: data?.data?.metaTitle ?? "",
            metaDescription: data?.data?.metaDescription ?? "",
        });
        setImagePreview(data?.data?.image);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver((id == undefined) ? addProductValidation : editProductValidation),
        mode: "onBlur",
    });

    const productSubmitHandler = async (data) => {
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "image" && !value?.[0]) return;
                formData.append(key, key === "image" ? value[0] : value);
            });

            let result = null;
            if (actionType == 'create') {
                result = await createAdminProduct(formData);
            } else {
                result = await updateAdminProduct(id, formData);
            }

            if (result?.statusCode === 200 || result?.success === true) {
                toast.success(result?.message);
                reset();
                navigate("/admin/products");
            } else {
                toast.error(result?.message || 'Something went wrong');
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    }


    return (
        <div className="w-full">
            {loading && <Loader />}
            <div className="bg-white rounded-2xl shadow-md">
                {/* Header */}
                <div className="border-b px-8 py-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {actionType == 'create' ? 'Add New Product' : 'Update Product'}
                        </h1>
                        <p className="text-gray-500 mt-2">
                            {actionType == 'create' ? 'Create a new' : 'modify'} product for your store.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(productSubmitHandler)} className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Side */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Product Information */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Product Information
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium">Product Name</label>
                                        <input {...register("name")} name='name' type="text" className="w-full border rounded-lg px-4 py-3" placeholder="Enter Product Name" />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.name?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Category </label>
                                        <select {...register("category")} name='category' className="w-full border rounded-lg px-4 py-3">
                                            <option value=''>Select Category</option>
                                            {categories.map((cat) => {
                                                return (<option key={cat._id} value={cat._id}>{cat.name}</option>);
                                            })}
                                        </select>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.category?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">SKU</label>
                                        <input {...register("sku")} name='sku' type="text" className="w-full border rounded-lg px-4 py-3" placeholder="SKU" />
                                        {errors.sku && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.sku?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">Pricing</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium">Price</label>
                                        <input {...register("price")} name='price' type="number" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.price && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.price?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Sale Price</label>
                                        <input {...register("salePrice")} name='salePrice' type="number" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.salePrice && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.salePrice?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">Description</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 font-medium">Short Description</label>
                                        <textarea {...register("shortDescription")} name='shortDescription' rows="3" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.shortDescription && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.shortDescription?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Product Description</label>
                                        <textarea {...register("description")} name='description' rows="7" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.description?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* SEO */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    SEO Information
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 font-medium">Meta Title</label>
                                        <input {...register("metaTitle")} name="metaTitle" type="text" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.metaTitle && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.metaTitle?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Meta Description
                                        </label>
                                        <textarea {...register("metaDescription")} name='metaDescription' rows="4" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.metaDescription && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.metaDescription?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className="space-y-8">
                            {/* Product Image */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Product Image
                                </h2>
                                <div className="flex flex-col items-center">
                                    <img src={imagePreview} className="w-56 h-56 rounded-xl border object-cover" />
                                    <input {...register("image", {
                                        onChange: handleImageChange,
                                    })} name='image' accept="image/*" type="file" className="mt-6" />
                                    {errors.metaDescription && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors?.metaDescription?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {/* Inventory */}
                            <div className="border rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Inventory
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 font-medium">Stock</label>
                                        <input {...register("stock")} name='stock' type="number" className="w-full border rounded-lg px-4 py-3" />
                                        {errors.stock && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.stock?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-medium">Status</label>
                                        <select {...register("isActive")} name='isActive' className="w-full border rounded-lg px-4 py-3">
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                        {errors.isActive && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.isActive?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <input {...register("isFeatured")} name='isFeatured' type="checkbox" className="w-5 h-5" />
                                        <label> Featured Product </label>
                                        {errors.isFeatured && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors?.isFeatured?.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-10 border-t pt-8">
                        <Link to="/admin/products" className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 cursor-pointer"> Cancel</Link>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer">
                            {actionType == 'create' ? 'Create' : 'Update'}
                        </button>
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


            </div >
        </div >
    )
}
