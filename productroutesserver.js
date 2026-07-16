import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {

    getProducts,

    getProductDetails,

    createProduct,

    updateProduct,

    deleteProduct

} from "../controllers/productController.js";



import protect from "../middleware/authMiddleware.js";


import admin from "../middleware/adminMiddleware.js";




const router = express.Router();





// Get all products

router.get(

    "/",

    getProducts

);





// Product details

router.get(

    "/:id",

    getProductDetails

);





// Create product (Admin)

router.post(

    "/",

    protect,

    admin,
    upload.single("image"),

    createProduct

);





// Update product (Admin)

router.put(

    "/:id",

    protect,

    admin,

    updateProduct

);





// Delete product (Admin)

router.delete(

    "/:id",

    protect,

    admin,

    deleteProduct

);





export default router;