import mongoose from 'mongoose'

export const connectDB=async ()=>{
    try {
        const mongodbConnection=process.env.MONGO_URI||'mongodb://localhost:27017//homeplate';
        await mongoose.connect(mongodbConnection)
        console.log("Mongodb connected successfully...");
        
    } catch (error) {
      console.error("Mongodb connection error",error)  
    }
}