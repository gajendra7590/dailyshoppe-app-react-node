import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import GuestRoute from "../gaurds/GuestRoute";
import ProtectedRoute from "../gaurds/ProtectedRoute";
import AdminProtectedRoute from "../gaurds/AdminProtectedRoute";

import FrontendLayout from "../layouts/FrontendLayout";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";

// ================= FRONTEND =================

const Home = lazy(() => import("../pages/frontend/home/Home"));
const Login = lazy(() => import("../pages/frontend/Login"));
const Register = lazy(() => import("../pages/frontend/Register"));
const Cart = lazy(() => import("../pages/frontend/cart/Carts"));
const ProductList = lazy(() => import("../pages/frontend/product/ProductList"));
const ProductDetail = lazy(() => import("../pages/frontend/ProductDetail"));

const Checkout = lazy(() => import("../pages/frontend/checkout/Checkout"));

const AboutUs = lazy(() => import("../pages/frontend/StaticPages/AboutUs"));
const ContactUs = lazy(() => import("../pages/frontend/StaticPages/ContactUs"));
const Support = lazy(() => import("../pages/frontend/StaticPages/Support"));
const HelpCenter = lazy(() => import("../pages/frontend/StaticPages/HelpCenter"));

const EmailVerification = lazy(() => import("../pages/frontend/EmailVerification"));

const UserProfile = lazy(() => import("../pages/frontend/profile/Profile"));
const UserUpdateProfile = lazy(() => import("../pages/frontend/profile/UpdateProfile"));
const UserChangePassword = lazy(() => import("../pages/frontend/profile/ChangePassword"));
const UserLogout = lazy(() => import("../pages/frontend/profile/Logout"));

// ================= ADMIN =================

const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));

const Categories = lazy(() => import("../pages/admin/categories/Categories"));
const AddEditCategory = lazy(() => import("../pages/admin/categories/AddEditCategory"));

const Products = lazy(() => import("../pages/admin/products/Products"));
const AddEditProduct = lazy(() => import("../pages/admin/products/AddEditProduct"));

const Orders = lazy(() => import("../pages/admin/orders/Orders"));
const Users = lazy(() => import("../pages/admin/users/Users"));
const Profile = lazy(() => import("../pages/admin/users/Profile"));

export default function AppRoutes() {

    return (

        <Suspense fallback={<Loader />}>

            <Routes>

                {/* ================= FRONTEND ================= */}

                <Route path="/" element={<FrontendLayout />}>

                    <Route index element={<Home />} />

                    {/* Public */}

                    <Route path="products" element={<ProductList />} />
                    <Route path="products/:catname/:catId" element={<ProductList />} />
                    <Route path="product/:slug/:pid" element={<ProductDetail />} />

                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="support" element={<Support />} />
                    <Route path="help-center" element={<HelpCenter />} />

                    {/* Guest */}

                    <Route element={<GuestRoute />}>

                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="email-verification" element={<EmailVerification />} />

                    </Route>

                    {/* User */}

                    <Route element={<ProtectedRoute />}>

                        <Route path="profile" element={<UserProfile />} />
                        <Route path="profile-update" element={<UserUpdateProfile />} />
                        <Route path="change-password" element={<UserChangePassword />} />
                        <Route path="logout" element={<UserLogout />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />


                    </Route>

                </Route>

                {/* ================= ADMIN ================= */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<AdminProtectedRoute />}>

                        <Route path="/admin" element={<AdminLayout />}>

                            <Route index element={<Dashboard />} />

                            <Route path="dashboard" element={<Dashboard />} />

                            <Route path="categories" element={<Categories />} />
                            <Route path="categories/create" element={<AddEditCategory />} />
                            <Route path="categories/edit/:id" element={<AddEditCategory />} />

                            <Route path="products" element={<Products />} />
                            <Route path="products/create" element={<AddEditProduct />} />
                            <Route path="products/edit/:id" element={<AddEditProduct />} />

                            <Route path="orders" element={<Orders />} />

                            <Route path="users" element={<Users />} />

                            <Route path="profile" element={<Profile />} />

                        </Route>

                    </Route>

                </Route>

            </Routes>

        </Suspense>

    );

}