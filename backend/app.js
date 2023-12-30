import express from 'express'
import dotenv from 'dotenv'
import connectdb from './connectDb/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cloudinary from 'cloudinary'
import ErrorHandler from "./middleware/error.js"
import router from './router/routes.js'
const app = express();


process.on("uncaughtException",(err)=>{
    console.log(`uncaughtException occur : ${err.message}`)
    console.log("shutting down the server for handle uncaught exception")

})
if(process.env.NODE_ENV != 'PRODUCTION'){
    dotenv.config({
        path:"backend/config/.env"
    })
}
connectdb()
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
app.use(cookieParser())
app.use(express.json())
app.use(cors({origin:"http://localhost:3000",credentials: true}))

app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))
if(process.env.NODE_ENV !== 'PRODUCTION'){
    dotenv.config({
        path:"backend/config/.env"
    })
}

app.use('/api/u2/user',router)

app.use("/test" ,(req,res)=>{
    res.send("hello")
})
app.use(ErrorHandler)

export default app