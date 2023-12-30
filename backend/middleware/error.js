import ErrorHandler from "../utils/ErrorHandler.js"
const error = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";


    // wrong mongoDb ID error
    if(err.name === 'CastError'){
        const message = `resource not found with this id.. inavlid ${err.path} `
        err = new ErrorHandler(message,400)
    
        
    }

    // duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered `
        err = new ErrorHandler(message,400)
    
    }

    if(err.name === 'CastError'){
        const message = `resource not found with this id.. inavlid ${err.path} `
        err = new ErrorHandler(message,400)
    
    }

    // wrong jwt error

    // if(err.name === 'jsonwebTokenError'){
    //     const message = `Your url is invalid please try again later `
    //     err = new ErrorHandler(message,400)
    
    // }

    // if(err.name === 'TokenExpiredError'){
    //     const message = `Token is expired please try again`
    //     err = new ErrorHandler(message,400)
    
    // }

    // res.status(err.statusCode).json({
    //     success:false,
    //     message:err.message
    // })

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
      console.log(err)
}

export default error