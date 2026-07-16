/**
 * controllers/productController.js
 */


import Product from "../models/Product.js";





// Get All Products

export const getProducts = async(req,res)=>{


    try{


        const {

            keyword,

            category

        } = req.query;



        let query={};



        if(keyword){


            query.name = {

                $regex:keyword,

                $options:"i"

            };


        }




        if(category){


            query.category = category;


        }




        const products =

        await Product.find(query);




        res.json({

            products

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Get Single Product

export const getProductDetails = async(req,res)=>{


    try{


        const product =

        await Product.findById(

            req.params.id

        );




        if(!product){


            return res.status(404).json({

                message:"Product not found"

            });


        }



        res.json({

            product

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};





// Create Product (Admin)

export const createProduct = async(req,res)=>{


    try{


        let imageUrl = "";



        if(req.file){


            const uploadResult =

            await cloudinary.uploader.upload(

                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

                {

                    folder:"shopsphere/products"

                }

            );


            imageUrl = uploadResult.secure_url;


        }





        const product = await Product.create({


            ...req.body,


            image:imageUrl,


            createdBy:req.user._id


        });





        res.status(201).json({

            product

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};





// Update Product (Admin)

export const updateProduct = async(req,res)=>{


    try{


        const product =

        await Product.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true

            }


        );




        res.json({

            product

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Delete Product (Admin)

export const deleteProduct = async(req,res)=>{


    try{


        await Product.findByIdAndDelete(

            req.params.id

        );




        res.json({

            message:"Product deleted"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};