import mongoose from "mongoose";

const connectDB = async():Promise<void> =>{
    try {
         const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MONGODB_URI is missing");
        }
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.error("MongoDB connection Failed: ", error);
        throw error
    }
}


export default connectDB;