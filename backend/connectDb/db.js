import mongoose from "mongoose";
const db = async()=>{
    
    try{
       mongoose.connect('mongodb+srv://alena:kty5xO5cRu7LqYc8@cluster0.w7ykgib.mongodb.net/PK')
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