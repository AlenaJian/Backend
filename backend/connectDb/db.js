import mongoose from "mongoose";
const db = async()=>{
    
    try{
        const data = await mongoose.connect(process.env.DB_URL)
        console.log(`mongoDb connected with server: ${data.connection.host}`)
    }
    catch(err){
        console.log(`Error:${err.message}`)
        process.exit(1)
    }
}
export default db