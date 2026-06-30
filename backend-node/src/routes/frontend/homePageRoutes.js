import express from "express";
const router = express.Router();
import { homeTopCategories, shopByCategory, filterByCategories } from "../../controllers/frontend/categoryController.js";
import { featuredProducts, getAllProducts, productDetail } from "../../controllers/frontend/productController.js";
import { submitContactUs, submitSubscribeNewsLetter } from "../../controllers/frontend/commonController.js";
import { saveContactUsValidation, saveNewsLetterValidation } from '../../validations/frontend/commonValidations.js';

//CATEGORIES
router.get("/homeTopCategories", homeTopCategories);
router.get("/shopByCategory", shopByCategory);
router.get("/filterByCategories", filterByCategories);

//PRODUCTS
router.get("/featuredProducts", featuredProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/productDetail/:productId", productDetail);

//Common
router.post("/submitContactUs", saveContactUsValidation, submitContactUs);
router.post("/submitSubscribeNewsLetter", saveNewsLetterValidation, submitSubscribeNewsLetter);

export default router;