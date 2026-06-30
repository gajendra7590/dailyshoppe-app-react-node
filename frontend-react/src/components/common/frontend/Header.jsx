import { Outlet, Link } from "react-router";
import { isLoggedIn, getUser } from "../../../utils/auth";
import toast from "react-hot-toast";
import { useCartContextHook } from "../../../context/CartContext";


export default function Header() {
    const loggedIn = isLoggedIn();
    const user = getUser();
    const { cartCount } = useCartContextHook();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        {import.meta.env.VITE_APP_NAME}
                    </Link>

                    {/* Search */}
                    <div className="hidden md:block flex-1 max-w-xl mx-10">
                        <input type="text" placeholder="Search products..." className="w-full border rounded-lg px-4 py-2" />
                    </div>

                    {/* Menu */}
                    <div className="flex items-center gap-5">
                        {!loggedIn ? (
                            <>
                                <Link to="/login" >
                                    LOGIN
                                </Link>

                                <Link to="/register">
                                    REGISTER
                                </Link>
                            </>
                        ) : (
                            <>
                                {user?.role?.name && <Link to="/admin/dashboard">ADMIN PORTAL</Link>}

                                <Link to="/profile">
                                    MY PROFILE
                                </Link>
                                <Link to="/logout">
                                    LOGOUT
                                </Link>
                                <Link to="/cart">
                                    CART ({cartCount})
                                </Link>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </header>
    )
}
