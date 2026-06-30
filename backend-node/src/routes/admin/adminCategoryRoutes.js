import express from "express";
import { tokenVeirfy } from "../../middleware/authMiddleware.js";
import { checkAdminRole } from "../../middleware/adminMiddleware.js";
import {
    getCategories, getCategory, createCategory, updateCategory, deleteCategory, getCategoryDropDown
} from '../../controllers/admin/categoryController.js';

import { createCategoryValidation, updateCategoryValidation } from '../../validations/admin/categories/categoryValidations.js';

import { upload } from '../../middleware/uploadMiddleware.js';
const uploadCategories = upload("categories");

const router = express.Router();

router.get("/", tokenVeirfy, checkAdminRole, getCategories);

router.get("/dropdowns", tokenVeirfy, checkAdminRole, getCategoryDropDown);

router.get("/:id", tokenVeirfy, checkAdminRole, getCategory);

router.post("/", tokenVeirfy, checkAdminRole, uploadCategories.single('image'), createCategoryValidation, createCategory);

router.post("/:id", tokenVeirfy, checkAdminRole, uploadCategories.single('image'), updateCategoryValidation, updateCategory);

router.delete("/:id", tokenVeirfy, checkAdminRole, deleteCategory);



export default router;