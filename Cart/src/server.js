import express from "express";

import morgan from "morgan";

import rateLimit from "express-rate-limit";

import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db.js";
import authRouter from "./routes/User.js";
import cartRouter from "./routes/Cart.js";
dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(rateLimit({windowMs:60*1000,max:100}));

app.use("/",authRouter);
app.use("/",cartRouter);

app.get("/check",(req,res)=>
{
    res.json({
    Message:"Server is running fine"
})
})

const PORT=4000;

app.listen(PORT,async(req,res)=>
{
    try{
        await connectDB();
    console.log("App is running on port 4000..");
    }
    catch(err)
    {
        console.log(err.message);
    }
})