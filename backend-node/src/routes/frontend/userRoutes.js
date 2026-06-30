import express from "express";
const router = express.Router();

import { tokenVeirfy } from "../../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword } from "../../controllers/frontend/profileController.js";

import { updatePasswordValidation, updateProfileValidation } from '../../validations/frontend/profileValidation.js'

import { upload } from '../../middleware/uploadMiddleware.js';
const uploadUserProfile = upload("userProfile");

//PROFILE
router.get("/user/getProfile", tokenVeirfy, getProfile);
router.post("/user/updateProfile", tokenVeirfy, uploadUserProfile.single('image'), updateProfileValidation, updateProfile);
router.post("/user/changePassword", tokenVeirfy, updatePasswordValidation, changePassword);

export default router;