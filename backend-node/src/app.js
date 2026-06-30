import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

console.log(path.join(process.cwd(), "uploads"));

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const ADMIN_ROUTES_PREFIX = '/api/admin';
const FRONTEND_ROUTES_PREFIX = '/api';

/*
|--------------------------------------------------------------------------
| Routes Imports
|--------------------------------------------------------------------------
*/

//AUTH ROUTES
import authRoutes from "./routes/authRoutes.js";

//ADMIN ROUTES
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
import adminCategoryRoutes from "./routes/admin/adminCategoryRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
// import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
// import adminCouponRoutes from "./routes/admin/adminCouponRoutes.js";
// import adminBannerRoutes from "./routes/admin/adminBannerRoutes.js";

//FRONTEND ROUTES
import homePageRoutes from "./routes/frontend/homePageRoutes.js";
import userRoutes from "./routes/frontend/userRoutes.js";
import cartRoutes from "./routes/frontend/cartRoutes.js";
// import orderRoutes from "./routes/frontend/orderRoutes.js";
// import reviewRoutes from "./routes/frontend/reviewRoutes.js"; 

/*
|--------------------------------------------------------------------------
| Route Prefixes - Used Here
|--------------------------------------------------------------------------
*/

//AUTH ROUTES
app.use(`${FRONTEND_ROUTES_PREFIX}/auth`, authRoutes);

//ADMIN ROUTES
app.use(`${ADMIN_ROUTES_PREFIX}/products`, adminProductRoutes);
app.use(`${ADMIN_ROUTES_PREFIX}/categories`, adminCategoryRoutes);
app.use(`${ADMIN_ROUTES_PREFIX}/users`, adminUserRoutes);

// app.use("/api/admin/orders", adminOrderRoutes);
// app.use("/api/admin/coupons", adminCouponRoutes);
// app.use("/api/admin/banners", adminBannerRoutes);

//FRONTEND ROUTES
app.use(`${FRONTEND_ROUTES_PREFIX}`, homePageRoutes);
app.use(`${FRONTEND_ROUTES_PREFIX}`, userRoutes);
app.use(`${FRONTEND_ROUTES_PREFIX}`, cartRoutes);

// app.use("/api/orders", orderRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/user", userRoutes);

export default app;