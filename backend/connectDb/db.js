import mongoose from "mongoose";
const db = async()=>{
    
    try{
        const data = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongoDb connected with server: ${data.connection.host}`)
    }
    catch(err){
        console.log(`Error:${err.message}`)
        process.exit(1)
    }
}
export default db