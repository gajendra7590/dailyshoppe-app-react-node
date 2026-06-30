import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {

    const token =
        localStorage.getItem("token");

    return token
        ? <Navigate to="/" replace />
        : <Outlet />;
}