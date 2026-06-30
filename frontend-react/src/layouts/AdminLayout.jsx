import { Outlet, Link } from "react-router";
import Sidebar from "../components/common/admin/Sidebar";
import TopNavBar from "../components/common/admin/TopNavBar";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Right Side */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <TopNavBar />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;