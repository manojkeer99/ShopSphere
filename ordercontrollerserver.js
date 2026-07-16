/**
 * controllers/orderController.js
 */


import Order from "../models/Order.js";




// Create Order

export const createOrder = async(req,res)=>{


    try{


        const order = await Order.create({


            user:req.user._id,


            items:req.body.items,


            shippingAddress:req.body.shippingAddress,


            paymentMethod:req.body.paymentMethod,


            totalAmount:req.body.totalAmount


        });




        res.status(201).json({

            order

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Get My Orders

export const getMyOrders = async(req,res)=>{


    try{


        const orders = await Order.find({

            user:req.user._id

        })

        .sort({

            createdAt:-1

        });





        res.json({

            orders

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Get Single Order

export const getOrderDetails = async(req,res)=>{


    try{


        const order = await Order.findById(

            req.params.id

        )

        .populate(

            "user",

            "name email"

        );





        if(!order){


            return res.status(404).json({

                message:"Order not found"

            });


        }




        res.json({

            order

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Admin Get All Orders

export const getAllOrders = async(req,res)=>{


    try{


        const orders = await Order.find()

        .populate(

            "user",

            "name email"

        )

        .sort({

            createdAt:-1

        });





        res.json({

            orders

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Admin Update Status

export const updateOrderStatus = async(req,res)=>{


    try{


        const order = await Order.findByIdAndUpdate(

            req.params.id,


            {

                orderStatus:req.body.status

            },


            {

                new:true

            }


        );




        res.json({

            order

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};