/**
 * controllers/userController.js
 */


import User from "../models/User.js";





// Get All Users (Admin)

export const getAllUsers = async(req,res)=>{


    try{


        const users = await User.find()

        .select("-password")

        .sort({

            createdAt:-1

        });





        res.json({

            users

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Delete User (Admin)

export const deleteUser = async(req,res)=>{


    try{


        const user = await User.findById(

            req.params.id

        );





        if(!user){


            return res.status(404).json({

                message:"User not found"

            });


        }





        await user.deleteOne();





        res.json({

            message:"User deleted"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Update User Role (Admin)

export const updateUserRole = async(req,res)=>{


    try{


        const user = await User.findByIdAndUpdate(


            req.params.id,


            {


                role:req.body.role


            },


            {


                new:true

            }


        )

        .select("-password");





        res.json({

            user

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};