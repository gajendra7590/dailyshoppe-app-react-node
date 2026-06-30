import { useState, useEffect } from 'react';
import { getAdminProducts, deleteAdminProduct, getCategoryDropDown } from '../../../services/admin/adminProductService';
import { Link, Links } from 'react-router';

export default function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isLoaded, setIsLoaded] = useState(false);

    const [search, setSearch] = useState("");
    const [searchByCat, setSearchByCat] = useState("");
    const [searchByStatus, setSearchByStatus] = useState("");
    const [searchByFeatured, setSearchByFeatured] = useState("");

    useEffect(() => {
        fetchProducts();
        if (!isLoaded) {
            fetchCategories();
            setIsLoaded(true);
        }
    }, [page, search, searchByCat, searchByStatus, searchByFeatured]);

    const fetchCategories = async () => {
        const catRes = await getCategoryDropDown();
        setCategories(catRes?.data || [])
    }

    const fetchProducts = async () => {
        const response = await getAdminProducts({ page, limit, search, searchByCat, searchByStatus, searchByFeatured });
        console.log('response', response)
        setProducts(response?.data?.products);
        setTotalPages(response?.data?.totalPages);
    };

    const handleDeleteProduct = async () => {
        try {
            const result = await Swal.fire({ title: "Delete Product?", text: "This action cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonText: "OK", cancelButtonText: "CANCEL" });
            if (result.isConfirmed) {
                const delRes = await deleteAdminProduct(id);
                if (delRes?.statusCode === 200 || delRes?.success === true) {
                    toast.success(delRes?.message);
                    fetchProducts();
                } else {
                    toast.error(delRes?.message || 'Something went wrong');
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    }

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.length >= 3 || value.length === 0) {
            setSearch(value);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500">Manage all products</p>
                </div>
                <Link to="/admin/products/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium">Add Product</Link>
            </div>

            {/* Filters */}
            <div className="p-6 border-b">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input onChange={handleSearchChange} type="text" placeholder="Search product..." className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
                    <select onChange={(e) => { setSearchByCat(e.target.value) }} className="border border-gray-300 rounded-lg px-4 py-3">
                        <option value=''> All Categories </option>
                        {categories.length && categories?.map((cat) => {
                            return (<option key={cat?._id} value={cat?._id}>{cat?.name} </option>);
                        })}
                    </select>
                    <select onChange={(e) => { setSearchByStatus(e.target.value) }} className="border border-gray-300 rounded-lg px-4 py-3">
                        <option value=''>All Status</option>
                        <option value={true}> Active </option>
                        <option value={false}> Inactive </option>
                    </select>
                    <select onChange={(e) => { setSearchByFeatured(e.target.value) }} className="border border-gray-300 rounded-lg px-4 py-3">
                        <option value=''>Featured</option>
                        <option value={true}>Yes </option>
                        <option value={false}>No </option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-900 text-white">
                        <tr>

                            <th className="px-4 py-4 text-left">
                                Image
                            </th>

                            <th className="px-4 py-4 text-left">
                                Product
                            </th>

                            <th className="px-4 py-4 text-left">
                                Category
                            </th>

                            <th className="px-4 py-4 text-left">
                                Price
                            </th>

                            <th className="px-4 py-4 text-left">
                                Sale Price
                            </th>

                            <th className="px-4 py-4 text-left">
                                Stock
                            </th>

                            <th className="px-4 py-4 text-left">
                                Status
                            </th>

                            <th className="px-4 py-4 text-center">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 ? (
                            products.map(product => (
                                <tr key={product?._id} className="border-b hover:bg-blue-50">
                                    <td className="px-4 py-4">
                                        <img src={product?.image} alt={product?.name} className="w-14 h-14 rounded-lg object-cover border" />
                                    </td>
                                    <td className="px-4 py-4">
                                        {product?.name}
                                    </td>

                                    <td className="px-4 py-4">
                                        {product?.category?.name}
                                    </td>

                                    <td className="px-4 py-4">
                                        ₹{product?.price}
                                    </td>

                                    <td className="px-4 py-4">
                                        ₹{product?.salePrice}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                            {product?.stock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${product?.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                            {product?.isActive == true ? 'Active ' : 'InActive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center gap-2">

                                            <Link to={`/admin/products/edit/${product._id}`} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer">
                                                Edit
                                            </Link>

                                            <button onClick={() => { handleDeleteProduct(product._id) }} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 cursor-pointer">
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr><td className="px-3 py-3 text-center text-gray-500" colSpan="8">No Record Found..</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 border-t">
                {totalPages == 0 && (
                    <div className="flex items-center justify-between mt-6"></div>
                )}
                {
                    totalPages > 0 && <>
                        <p className="text-sm text-gray-500">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                {page}
                            </button>
                            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                Next
                            </button>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}
