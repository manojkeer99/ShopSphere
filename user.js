/**
 * models/User.js
 */


import mongoose from "mongoose";



const userSchema = new mongoose.Schema(


{

    name:{

        type:String,

        required:true

    },


    email:{

        type:String,

        required:true,

        unique:true

    },


    password:{

        type:String,

        required:true,

        minlength:6

    },


    phone:{

        type:String

    },


    avatar:{

        type:String,

        default:""

    },


    role:{

        type:String,

        default:"user"

    },


    address:[

        {

            fullName:String,

            phone:String,

            street:String,

            city:String,

            state:String,

            postalCode:String,

            country:String

        }

    ]

},


{

    timestamps:true

}


);




const User = mongoose.model(

    "User",

    userSchema

);



export default User;