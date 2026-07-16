/**
 * utils/sendEmail.js
 */


import transporter from "../config/nodemailer.js";




const sendEmail = async(options)=>{


    const mailOptions = {


        from:process.env.EMAIL_USER,


        to:options.email,


        subject:options.subject,


        html:options.message


    };





    await transporter.sendMail(

        mailOptions

    );


};




export default sendEmail;