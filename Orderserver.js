/**
 * models/Order.js
 */


import mongoose from "mongoose";



const orderSchema = new mongoose.Schema(

{


    user:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },



    items:[

        {


            product:{

                type:mongoose.Schema.Types.ObjectId,

                ref:"Product"

            },


            name:String,


            image:String,


            quantity:Number,


            price:Number


        }

    ],




    shippingAddress:{


        fullName:String,


        phone:String,


        street:String,


        city:String,


        state:String,


        postalCode:String,


        country:String


    },





    paymentMethod:{

        type:String,

        default:"COD"

    },



    paymentStatus:{

        type:String,

        default:"pending"

    },



    orderStatus:{

        type:String,

        default:"placed"

    },



    totalAmount:{

        type:Number,

        required:true

    }



},


{

    timestamps:true

}


);



const Order = mongoose.model(

    "Order",

    orderSchema

);



export default Order;