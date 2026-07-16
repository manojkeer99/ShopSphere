/**
 * middleware/uploadMiddleware.js
 */


import multer from "multer";




// Store file in memory

const storage = multer.memoryStorage();




const upload = multer({


    storage,


    limits:{


        fileSize:5 * 1024 * 1024


    }



});



export default upload;