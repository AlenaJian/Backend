import app from './app.js'

import connectdb from './connectDb/db.js'

import cloudinary from 'cloudinary'

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  })

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

  connectdb()
  cloudinary.config({
      cloud_name : process.env.CLOUDINARY_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
  })



const server = app.listen(process.env.PORT,()=>{
    console.log("server is running")
})

//tum monolithic architecture follow karti, sab frontend & backend file ek hi project mai daal ke, khichdi bana dete ho nhi alg alg h mane to koi abi tk frontend file kholi hi nhi bs backend ka code dikahya h 
//emoji kaise dalte hai, mujhe apna face reaction daalna hai ty
//yar tumne abhi abhi kaha ki ye app.js front end ki file hai!! nhi bola mane ye sb backend 
process.on('unhandledRejection',(err)=>{
    console.log(err)
    console.log(`server is shutdown with an error ${err.message}`)

    server.close(()=>{
        process.exit(1)
    })
})