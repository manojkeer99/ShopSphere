/**
 * routes/orderRoutes.js
 */


import express from "express";


import {

    createOrder,

    getMyOrders,

    getOrderDetails,

    getAllOrders,

    updateOrderStatus

} from "../controllers/orderController.js";


import protect from "../middleware/authMiddleware.js";


import admin from "../middleware/adminMiddleware.js";



const router = express.Router();





// Create Order

router.post(

    "/",

    protect,

    createOrder

);





// User Orders

router.get(

    "/my",

    protect,

    getMyOrders

);





// Single Order

router.get(

    "/:id",

    protect,

    getOrderDetails

);





// Admin All Orders

router.get(

    "/admin/all",

    protect,

    admin,

    getAllOrders

);





// Admin Update Status

router.put(

    "/:id/status",

    protect,

    admin,

    updateOrderStatus

);





export default router;