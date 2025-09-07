import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function authMiddleware(req,res,next)
{
try{
     const token=req.headers["authorization"]?.split(" ")[1];
 if(!token) return res.status(401).json({
        error:"You are not logged in",
 })

 const decode=jwt.decode(token,process.env.JWT_SECRET);
 req.user=decode;
 next();
}
catch(err)
{
    res.status(400).json({
        error:err.message
    })
}
}