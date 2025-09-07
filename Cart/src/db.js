import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection Successful");
    }
    catch(err)
    {
        console.log("Error in connecting to db",err.message);
        process.exit(1);
    }
}