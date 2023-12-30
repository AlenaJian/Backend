//  send token in cookies to check user login or not

const sendToken = async(user,statusCode,res)=>{
    const token =  await user.getJwtToken();
    // console.log("token",token) 
        const options ={
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:"none",
        secure:true,

    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    })
}
export default sendToken

