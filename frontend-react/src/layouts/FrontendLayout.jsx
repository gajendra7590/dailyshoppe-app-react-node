import { Outlet, Link } from "react-router";
import Header from "../components/common/frontend/Header";
import CategoriesNavbar from "../components/common/frontend/CategoriesNavbar";
import Footer from "../components/common/frontend/Footer";

function FrontendLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">

            {/* Header */}
            <Header />

            {/* Categories Nav */}
            <CategoriesNavbar />

            {/* Content */}
            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default FrontendLayout;