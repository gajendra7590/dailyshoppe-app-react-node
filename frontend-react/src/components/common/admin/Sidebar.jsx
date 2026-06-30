import { Outlet, Link, NavLink } from "react-router";


export default function Sidebar() {

    const onLogoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const menuClass = ({ isActive }) =>
        `block px-4 py-3 rounded-lg transition-all duration-200 ${isActive
            ? "bg-blue-600 text-white font-semibold text-xl shadow"
            : "text-slate-300 hover:bg-slate-800 text-xl hover:text-white"
        }`;

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-xl font-bold"> Admin Panel </h1>
            </div>
            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/admin" end className={menuClass} > Dashboard </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/categories" className={menuClass} > Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products" className={menuClass}>Products </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className={menuClass}>Orders</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className={menuClass}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'} onClick={onLogoutHandler} className={menuClass}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );

}
