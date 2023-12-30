import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsynError.js";
import jwt from 'jsonwebtoken'

const isAuthenticate= catchAsyncError(async(req,res,next)=>{
  
    const {token} = req.cookies 

    if(!token){
        
        return next(new ErrorHandler("please login to continue",401))
    }
    const veirfyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    
   
    if(!veirfyToken){
        return next (new ErrorHandler("user not found, please login again"),400)
    }

    req.user = await User.findById(veirfyToken.id)

    next()

})

export default isAuthenticate