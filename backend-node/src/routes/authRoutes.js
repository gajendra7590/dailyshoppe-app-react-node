import express from "express";
const router = express.Router();
import { register, login, accountVerify } from "../controllers/auth/authController.js";
import { loginValidation, registrationValidation, accountVerifyValidation } from '../validations/auth/authValidations.js'


router.post("/register", registrationValidation, register);
router.post("/login", loginValidation, login);
router.post("/accountVerify", accountVerifyValidation, accountVerify);

export default router;