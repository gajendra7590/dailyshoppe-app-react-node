import { useState, useEffect } from 'react';
import { getAdminUsers } from '../../../services/admin/adminUserService';
import { Link, Links } from 'react-router';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(5);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchUsers();
        if (!isLoaded) {
            setIsLoaded(true);
        }
    }, [page, search, status, role]);

    const fetchUsers = async () => {
        const response = await getAdminUsers({ page, limit, search, status, role });
        console.log('response', response)
        setUsers(response?.data?.users);
        setTotalPages(response?.data?.totalPages);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value.length >= 3 || value.length === 0) {
            setSearch(value);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                    <p className="text-gray-500 mt-1">Manage all registered users.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 p-6 border-b">
                <input onChange={handleSearchChange} type="text" placeholder="Search by name or email..." className="border border-gray-300 rounded-lg px-4 py-3" />
                <select onChange={(e) => { setRole(e.target.value) }} className="border border-gray-300 rounded-lg px-4 py-3">
                    <option value="">All Roles</option>
                    <option value="6a32431c6670cde2844f0880">Admin</option>
                    <option value="6a32431c6670cde2844f0881">Customer</option>
                </select>
                <select onChange={(e) => { setStatus(e.target.value) }} className="border border-gray-300 rounded-lg px-4 py-3">
                    <option value="">All Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-4 border">Avatar</th>
                            <th className="px-6 py-4 border text-left">Name</th>
                            <th className="px-6 py-4 border text-left">Email</th>
                            <th className="px-6 py-4 border">Mobile</th>
                            <th className="px-6 py-4 border">Role</th>
                            <th className="px-6 py-4 border">Status</th>
                            <th className="px-6 py-4 border">Joined At</th>
                            <th className="px-6 py-4 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-blue-50 transition">
                                <td className="border px-6 py-4 text-center">
                                    <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full mx-auto border" />
                                </td>
                                <td className="border px-6 py-4">
                                    <div>
                                        <p className="font-semibold">{user?.name}</p>
                                        <p className="text-sm text-gray-500">{user?.name}</p>
                                    </div>
                                </td>
                                <td className="border px-6 py-4">{user?.email}</td>
                                <td className="border px-6 py-4 text-center">{user?.phone}</td>
                                <td className="border px-6 py-4 text-center">
                                    {user?.role?.name}
                                </td>
                                <td className="border px-6 py-4 text-center">
                                    <span className={user?.isActive == true ? 'px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold' : 'px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold'}>
                                        {user?.isActive == true ? 'Active' : 'InActive'}
                                    </span>
                                </td>
                                <td className="border px-6 py-4 text-center">{user?.createdAt}</td>
                                <td className="border px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200">
                                            View
                                        </button>
                                        <button className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200">
                                            Edit
                                        </button>
                                        <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
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

        </div >
    )
}
