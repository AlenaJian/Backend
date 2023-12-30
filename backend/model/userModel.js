import mongoose from "mongoose";
import brcyptjs from 'bcryptjs'
import  Jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Your name"],  
      },
      email: {
        type: String,
        required: [true, "Please enter your email"],
      },
      password: {
        type: String,
        required: [true, "Please enter your password "],
        minLength: [4, "Password length must be 4 to 16"],
        maxLength: [16, "Password length must be 4 to 16"],
        select: false,
      },
      avatar:{
        public_id:{
          type:String,
          required:true
        },
        url:{
          type:String,
          required:true
        }
       
      },
      createdAt:{
        type:Date,
        default:Date.now()
      },
})

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await brcyptjs.hash(this.password,10)
    
})
userSchema.methods.comparePassword = async function(pass){
    return await brcyptjs.compare(pass , this.password)
}
userSchema.methods.getJwtToken = async function(){
    return Jwt.sign({id:this._id},process.env.JWT_SECRETKEY,{expiresIn:process.env.JWT_EXPIRE})

}
const User = mongoose.model('User',userSchema)
export default User