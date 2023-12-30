const catchAsyncError =(thiserr)=>(req,res,next)=>{
    Promise.resolve(thiserr(req,res,next)).catch(next)
}

export  default catchAsyncError

