/**
 * controllers/cartController.js
 */


import Cart from "../models/Cart.js";

import Product from "../models/Product.js";





// Get User Cart

export const getCart = async(req,res)=>{


    try{


        let cart = await Cart.findOne({

            user:req.user._id

        })

        .populate(

            "items.product"

        );





        if(!cart){


            cart = await Cart.create({

                user:req.user._id,

                items:[]

            });


        }




        res.json({

            cart

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Add Product To Cart

export const addToCart = async(req,res)=>{


    try{


        const {

            productId,

            quantity

        } = req.body;




        const product =

        await Product.findById(

            productId

        );





        if(!product){


            return res.status(404).json({

                message:"Product not found"

            });


        }





        let cart = await Cart.findOne({

            user:req.user._id

        });





        if(!cart){


            cart = new Cart({

                user:req.user._id,

                items:[]

            });


        }






        const itemIndex =

        cart.items.findIndex(

            item =>

            item.product.toString()

            === productId

        );





        if(itemIndex > -1){


            cart.items[itemIndex].quantity +=

            quantity || 1;


        }

        else{


            cart.items.push({


                product:productId,


                quantity:quantity || 1,


                price:product.price


            });


        }




        calculateTotal(cart);



        await cart.save();





        res.json({

            cart

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Remove Item

export const removeFromCart = async(req,res)=>{


    try{


        const cart = await Cart.findOne({

            user:req.user._id

        });




        cart.items =

        cart.items.filter(

            item=>

            item.product.toString()

            !== req.params.productId

        );





        calculateTotal(cart);



        await cart.save();




        res.json({

            cart

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Update Quantity

export const updateQuantity = async(req,res)=>{


    try{


        const {

            quantity

        } = req.body;




        const cart = await Cart.findOne({

            user:req.user._id

        });





        const item =

        cart.items.find(

            item=>

            item.product.toString()

            === req.params.productId

        );




        if(item){


            item.quantity = quantity;


        }





        calculateTotal(cart);



        await cart.save();




        res.json({

            cart

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Calculate Price

const calculateTotal = (cart)=>{


    cart.subtotal =

    cart.items.reduce(

        (sum,item)=>

        sum +

        item.price *

        item.quantity,

        0

    );



    cart.grandTotal =

    cart.subtotal;


};