/**
 * routes/userRoutes.js
 */


import express from "express";


import {

    getAllUsers,

    deleteUser,

    updateUserRole

} from "../controllers/userController.js";


import protect from "../middleware/authMiddleware.js";


import admin from "../middleware/adminMiddleware.js";



const router = express.Router();





// Get All Users (Admin)

router.get(

    "/",

    protect,

    admin,

    getAllUsers

);





// Delete User

router.delete(

    "/:id",

    protect,

    admin,

    deleteUser

);





// Update User Role

router.put(

    "/:id",

    protect,

    admin,

    updateUserRole

);





export default router;