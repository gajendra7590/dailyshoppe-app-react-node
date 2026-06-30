import express from "express";
import { tokenVeirfy } from "../../middleware/authMiddleware.js";
import { checkAdminRole } from "../../middleware/adminMiddleware.js";
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/admin/userController.js';
import { createCategoryValidation, updateCategoryValidation } from '../../validations/admin/categories/categoryValidations.js';

import { upload } from '../../middleware/uploadMiddleware.js';

const uploadCategories = upload("users");

const router = express.Router();

router.get("/", tokenVeirfy, checkAdminRole, getUsers);

router.get("/:id", tokenVeirfy, checkAdminRole, createUser);

router.post("/", tokenVeirfy, checkAdminRole, uploadCategories.single('image'), createCategoryValidation, createUser);

router.post("/:id", tokenVeirfy, checkAdminRole, uploadCategories.single('image'), updateCategoryValidation, updateUser);

router.delete("/:id", tokenVeirfy, checkAdminRole, deleteUser);



export default router;