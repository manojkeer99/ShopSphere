/**
 * controllers/paymentController.js
 */


import razorpay from "../config/razorpay.js";





// Create Razorpay Order

export const createPayment = async(req,res)=>{


    try{


        const options = {


            amount:

            req.body.amount * 100,


            currency:"INR",


            receipt:

            `receipt_${Date.now()}`


        };





        const order =

        await razorpay.orders.create(

            options

        );





        res.json({


            orderId:order.id,


            amount:order.amount,


            currency:order.currency


        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};