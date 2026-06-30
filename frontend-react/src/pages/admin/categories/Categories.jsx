import { useEffect, useState } from "react";
import { getAdminCategories, deleteAdminCategories } from "../../../services/admin/adminCategoryService";
import moment from "moment";
import Swal from "sweetalert2";
import toast from "react-hot-toast"; 2
import { Link } from "react-router";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [status, setStatus] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.length >= 3 || value.length === 0) {
            setSearch(value);
        }
    };

    const fetchCategories = async () => {
        const response = await getAdminCategories({ page, search, totalPages, limit, status });
        setCategories(response?.data?.categories);
        setTotalPages(response?.data?.totalPages);
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({ title: "Delete Category?", text: "This action cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonText: "OK", cancelButtonText: "CANCEL" });
            if (result.isConfirmed) {
                const delRes = await deleteAdminCategories(id);
                if (delRes?.statusCode === 200 || delRes?.success === true) {
                    toast.success(delRes?.message);
                    fetchCategories();
                } else {
                    toast.error(delRes?.message || 'Something went wrong');
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(msg);
        }
    }



    useEffect(() => {
        fetchCategories();
    }, [page, search, status]);

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center p-6 border-b">
                <div>
                    <h2 className="text-2xl font-bold">
                        Categories
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Manage your categories
                    </p>
                </div>
                <div className="flex gap-3">
                    <input onChange={handleSearchChange} type="text" placeholder="Search category..." className="border rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none" />
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer">
                        <option value=''>All Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                    <Link to='/admin/categories/create' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Add</Link>

                </div>
            </div>
            <table className="w-full border border-white-200">
                <thead className="bg-slate-900 text-white">
                    <tr>
                        <th className="text-left px-6 py-4 font-semibold">
                            Category Name
                        </th>
                        <th className="text-left px-6 py-4 font-semibold">
                            Status
                        </th>
                        <th className="text-left px-6 py-4 font-semibold">
                            Created
                        </th>
                        <th className="text-center px-6 py-4 font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category?._id} className="border-b hover:bg-blue-50 transition-all duration-200">
                                <td className="px-6 py-4 font-medium">
                                    {category?.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category?.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {category?.isActive == true ? 'Active ' : 'InActive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {moment(category?.createdAt).format("DD/MM/YYYY")}
                                </td>
                                <td className="px-6 py-4 border-b hover:bg-blue-50">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/admin/categories/edit/${category?._id}`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 cursor-pointer">
                                            Edit
                                        </Link>
                                        <button onClick={() => { handleDelete(category?._id) }} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr><td className="px-3 py-3 text-center text-gray-500" colSpan="4">No Record Found..</td></tr>
                    )}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-8">

                {totalPages == 0 && (
                    <div className="flex items-center justify-between mt-6">
                        No Data Available
                    </div>
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



    );

}