/**
 * controllers/adminController.js
 */


import User from "../models/User.js";

import Product from "../models/Product.js";

import Order from "../models/Order.js";





// Get Analytics Data

export const getAnalytics = async(req,res)=>{


    try{


        const totalUsers =

        await User.countDocuments();




        const totalProducts =

        await Product.countDocuments();




        const totalOrders =

        await Order.countDocuments();




        const revenueData =

        await Order.aggregate([


            {

                $group:{

                    _id:null,

                    total:{

                        $sum:"$totalAmount"

                    }

                }

            }


        ]);





        const totalRevenue =

        revenueData[0]?.total || 0;





        res.json({


            analytics:{


                users:totalUsers,


                products:totalProducts,


                orders:totalOrders,


                revenue:totalRevenue


            }


        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};