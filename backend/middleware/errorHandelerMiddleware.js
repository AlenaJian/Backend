const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandel = (err,req,res,next)=>{
    if(res.status === 200){
        res.status(500)
    }
    console.log("req",res.statusCode)
    // console.log(err)
    // res.status(statusCode)
    res.json({
        message:err.message
    })
}
export {notFound,errorHandel}