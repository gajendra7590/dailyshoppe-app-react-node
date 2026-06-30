import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";
import { isLoggedIn, getUser } from "../utils/auth";

export default function AdminProtectedRoute() {
    const user = getUser();
    if (!user) {
        return <Navigate to="/login" replace />;
    } else {
        if (user?.role?.name === 'admin') {
            return <Outlet />;
        } else {
            toast.error('Your are not authorised to access this pages.')
            return <Navigate to="/login" replace />;
        }
    }
}
