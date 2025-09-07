import { Router } from "express";

import User from "../models/User.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import dotenv from "dotenv";

const router=Router();

router.post("/register",async(req,res)=>
{
    try{
        const{mail,password}=req.body;
    const hash=await bcrypt.hash(password,10);
    const user= new User({mail,password:hash});
    await user.save();
    res.status(201).json({
        Message:"User registered succesfully",
        user
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err.message,
        })
    }
})

router.post("/login",async(req,res)=>
{
    try{
        const{mail,password}=req.body;
        const user=await User.findOne({mail});
        if(!user) res.status(404).json({
            error:"User Not Found",
        })
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({
            error:"password incorrect",
        })
        const token=jwt.sign({_id:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({
        Message:"Logged in succesfully",
        token
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err.message,
        })
    }
})

export default router;
