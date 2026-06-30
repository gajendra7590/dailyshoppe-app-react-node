import express from "express";
import { tokenVeirfy } from "../../middleware/authMiddleware.js";
import { checkAdminRole } from "../../middleware/adminMiddleware.js";
import {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
} from '../../controllers/admin/productController.js';

import { createProductValidation, updateProductValidation } from '../../validations/admin/products/productsValidations.js';

import { upload } from '../../middleware/uploadMiddleware.js';
const uploadProducts = upload("products");

const router = express.Router();

router.get("/", tokenVeirfy, checkAdminRole, getProducts);

router.get("/:id", tokenVeirfy, checkAdminRole, getProduct);

router.post("/", tokenVeirfy, checkAdminRole, uploadProducts.single('image'), createProductValidation, createProduct);

router.post("/:id", tokenVeirfy, checkAdminRole, uploadProducts.single('image'), updateProductValidation, updateProduct);

router.delete("/:id", tokenVeirfy, checkAdminRole, deleteProduct);

export default router;