import jwt from 'jsonwebtoken'

const activationToken = (user)=>{
    return jwt.sign(user,process.env.ACTIVATION_KEY,{expiresIn:process.env.ACTIVATION_EXPIRES})
}
export default activationToken;