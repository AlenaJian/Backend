import User from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import activationToken from "../jwtToken/activationToken.js";
import nodeMail from "../utils/nodeMail.js";
import catchAsynError from "../middleware/catchAsynError.js";
import jwt from "jsonwebtoken";
import sendToken from "../jwtToken/jwtToken.js";
import AsyncHandler from "express-async-handler";
import bcryptjs from 'bcryptjs'
import resetActivationToken from "../jwtToken/resetActivationToken.js";
import cloudinary from 'cloudinary'

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password,avatar } = req.body;
    console.log("oooo")
    console.log("pass",password)
    const checkEmail = await User.findOne({ email });


    if (checkEmail) {
        res.status(400)
      throw new Error("User Already Exists")
    }

    console.log("afterr")

  const myCloud = await cloudinary.v2.uploader.upload(
    avatar,{folder:'avatars'},
  )

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: myCloud.public_id,
        url:myCloud.secure_url
      },
    };

    const token =  activationToken(user);
    const activeTokenUrl = `http://localhost:3000/${token}`;

    try {
      const sendingMail = nodeMail({
        email: user.email,
        subject: "[newShop] Please verify your device",
        text: 
           `Hello ${user.name}, 
            A sign in attempt requires further verification because we didn't recognize your device.To complete the signin, please click the below link to verify your account. 
            This link is valid  only for 5 minute :- ${activeTokenUrl} 
            if you don't attemp this please ignore this mail.
            Thanks,
            The newShop Team `,
      });
     
      if (sendingMail) {
       
        res.status(201).json({
          success: true,
          message: `please check your email :- ${user.email} to activate your acccount `,
        });
      }
    } catch (err) {
    //   return next(new ErrorHandler(err.message, 500));
    res.status(500)
    throw new Error(err.message)
    }
  } catch (err) {
    // return next(new ErrorHandler(err.message, 400));
    res.status(400)
    throw new Error(err.message)
  }
};

export const accountActivation = AsyncHandler(async (req, res, next) => {
    try {
      
      const {activation_token} = req.body;
      
      if (activation_token) {
          console.log("start",activation_token)
  
          const TokenCheck =  jwt.verify(
              activation_token,
              process.env.ACTIVATION_KEY,
              (err, verified) => {
                  if (err) {
                    return res.status(401).json('invalid token');
                  
                  }
                  return verified;
                }
            );

           

        if (!TokenCheck) {
          // console.log("okkk")
          return next(new ErrorHandler("Invalid Token", 400));
        }
        else{
          const { name, email, password, avatar } = TokenCheck;
        

        const createUser = await User.create({
          name,
          email,
          password,
          avatar,
        });

        console.log("user",createUser)
  
        if (createUser) {
          console.log("user creating")
          sendToken(createUser, 201, res);
        } else {
          console.log("user can't be created!!");
        }
        }
  
        
      } else {
        return next(new ErrorHandler("Token not found", 404));
      }
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
  
    }
  });
  
  export const loginUser = catchAsynError(async(req,res,next)=>{
    try{
    const {email,pass} = req.body
    //  ye dekho ye login user ka h aur iska jo route h vo ye h 
  
    if(!email || !pass){
      return next (new ErrorHandler("please fill all the fields!!",400))
    }
    const checkUser = await User.findOne({email}).select("+password")
  
    if(checkUser){

      const ispass = await checkUser.comparePassword(pass)
      console.log("ispass",ispass)

      if(ispass){
        console.log("before checkUser")
        sendToken(checkUser,201,res)
        console.log("aftwer checkUser")
  
      }
      else{
        console.log("yha")
        return next(new ErrorHandler("Wrong password",400))
        //  ye to ye error aana chahiye tha aur agr shi se login ho jae to show krna chahiye tha auro ksath me token bhi aata  aur jb cretae user func call kr rhi hu to usme mail jati h user  ke pass ki auth complete kro pr vo bhi nhi ja rhi 
        //toh basically woh hello kaise print horaha
      }
    }
    else{
      return next(new ErrorHandler("user not exist",401))
    }
  }
  catch(err){
    return next(new ErrorHandler(err.message,500))
  }
  })
  
  export const resetPass = catchAsynError(async(req,res,next)=>{
  
      const {password,newPassword,id} = req.body;
  
  
      const checkUser = await User.findById(id).select("+password")
      console.log(checkUser,"checkuser")
      
      if(checkUser){
       if(await checkUser.comparePassword(password)){
        const pass = await bcryptjs.hash(newPassword,10)
     
         const passupdate = await User.findOneAndUpdate({_id:id},{password:pass})
         const user = {
          id:checkUser._id,
          name:checkUser.name,
          email:checkUser.email,
  
  
         }
         const token = resetActivationToken(user)
         const activeTokenUrl = `https://web-app-cef.vercel.app/resetactivation/${token} `
         try{
          const passUpdateEmail = nodeMail({
            email:passupdate.email,
            subject: "[newShop] Change password ",
            text: 
               `Hello ${passupdate.name}, 
                A new activity found in your account, This is the confirm mail that your password has been updated successfully...
                if you don't attemp this please click this link and secure your account by change your password 
                 ${activeTokenUrl}.
                Thanks,
                The newShop Team `
          });
  
          if(passUpdateEmail){
            res.json({
  
            success: true,
            //  replace with password Change Successfully
            message: `Password Change Successfully`,
            })
          }
         }
       catch(err){
        return next(new ErrorHandler(err.message, 500));
       }
     
       }
       else{
        
        return next(new ErrorHandler("Your password not match please click the forget password!!", 401));
  
       }
      
      }
      else{
        return next(new ErrorHandler("User doesn't exist", 400));
  
      }
  
     
    
   
  
  })
  export const resetpassactivation = AsyncHandler(async(req,res,next)=>{
  try{
    const {resetactivation_token} = req.body
    if(resetactivation_token){
      const verify = jwt.verify(resetactivation_token ,process.env.RESETPASS_KEY,(err,verify)=>{
        if(err){
          return res.status(401).json('invalid token');
        }
        else{
          return verify
        }
      })
  
      if(!verify){
        console.log("okkk")
        return next(new ErrorHandler("Invalid Token", 400));
     
      }
      else{
        res.json({
          success:true,
          message:"Token validate successfull "
        })
      }
    }
  
  }
  catch(err){
    return next(new ErrorHandler(err.message, 500));
  
  }
  })
  
  export const throughemailresetpass = catchAsynError(async(req,res,next)=>{
    try{
      const {newPassword,resetactivation_token} =  req.body
      console.log("newpass",newPassword , "resetactivation_token",resetactivation_token)
      if(!newPassword || !resetactivation_token){
       
        res.status(400).json({
          success:false,
          message: "Time's up"
        })
      }
    
      if(resetactivation_token){
        const verify = jwt.verify(resetactivation_token ,process.env.RESETPASS_KEY,(err,verify)=>{
          if(err){
            return res.status(401).json('invalid token');
          }
          else{
            return verify
          }
        })
        if(!verify){
          console.log("throughemail")
          return next(new ErrorHandler("Invalid Token", 400));
       
        }
        else{
          const {id,email} = verify
         
          const checkUser = await User.findById(id)
         
          if(checkUser){ 
            const pass = await bcryptjs.hash(newPassword,10)
     
            const changepass = await User.findOneAndUpdate({_id:id},{password:pass})
           
            if(changepass){
              res.cookie("token",null ,{
                expires: new Date(Date.now()),
                httpOnly:true
              })
              res.status(200).json({
                success:true,
                message:"Password update successfully...Please Login to continue "
              })
            }
            else{
              return next(new ErrorHandler("Password not update please try after sometime", 500));
    
            }
          }
          else{
            return next(new ErrorHandler("Sorry something went wrong", 500));
          }
        }
        
    
    }}
    
    catch(err){
      console.log("err",err)
    }})
    
  
  export const forgetEmail = catchAsynError(async(req,res,next)=>{
    const {email} = req.body
    console.log("email",email)
    const checkid = await User.findOne({email})
    if(checkid){
      const user = {
        id:checkid._id,
        name:checkid.name,
        email:checkid.email
      }
      const token = resetActivationToken(user)
      const activeTokenUrl = `https://web-app-cef.vercel.app/resetactivation/${token} `
      try{
       const passUpdateEmail = nodeMail({
         email:checkid.email,
         subject: "[newShop] Change password ",
         text: 
            `Hello ${checkid.name}, 
             A new activity found in your account, This is a reset password Email. Please click the link to reset your password.
              ${activeTokenUrl}
              if you don't attemp this please ignore this email.
             Thanks,
             The newShop Team `
       });
  
       if(passUpdateEmail){
         res.json({
  
         success: true,
         //  replace with password Change Successfully
         message: `Password Change Email ${checkid.email} send Successfully`,
         })
       }
      }
    catch(err){
     return next(new ErrorHandler(err.message, 500));
    }
  
    }
    else{
      return next(new ErrorHandler("User not found",400))
    }
   
       }
  )
  
  
// yha chnage rh gya bs 

export const getUser = catchAsynError(async(req,res,next)=>{
  try{
    console.log("user.user:", req.user);
    const user = await User.findById(req.user.id)
   
    console.log("user: ",user)
    if(user){
      res.status(200).json({
        success:true,
        user
      })
    }
  }
  catch(err){
    return next(new ErrorHandler("User not found",400))
  }
 
})




export const logout = catchAsynError(async(req,res,next)=>{
  try{
    res.cookie("token",null ,{
      expires: new Date(Date.now()),
      httpOnly:true
    })
    res.status(201).json({
      success:true,
      message: "logout SucessFully...."
    })
  }
  catch(err){
    return next(new ErrorHandler(err.message,500))
  }
})