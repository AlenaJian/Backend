import mongoose from "mongoose";
const db = async()=>{
    
    try{
       mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log(`mongoDb connected with server: ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

    }
    catch(err){
        console.log(`Error:${err.message}`)
        process.exit(1)
    }
}
export default db