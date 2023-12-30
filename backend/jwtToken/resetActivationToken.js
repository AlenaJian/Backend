import jwt from 'jsonwebtoken'

const resetActivationToken =(user)=>{
   return jwt.sign(user,process.env.RESETPASS_KEY,{expiresIn:process.env.RESETPASSKEY_EXPIRES})
}
export default resetActivationToken