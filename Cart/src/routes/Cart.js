import { Router } from "express";

import Cart from "../models/Cart.js";

import { authMiddleware } from "../middlewares/Auth.js";

const router=Router();

router.post("/cart/create",authMiddleware,async(req,res)=>
{
    const {productName,productId,price,quantity}=req.body;

    let cart=await Cart.findOne({userId:req.user.id});
    if(!cart)
    {
        cart=new Cart({userId:req.user.id});
    }

    cart.items.push({...req.body});
    await cart.save();
    res.json({
        cart
    })
})


router.get("/cart/",authMiddleware,async(req,res)=>
{
 

  try{
      let cart=await Cart.findOne({userId:req.user.id});
   res.json({
    Results:cart.items.length,
    cart
   })
  }
  catch(err){
    return res.json({
        error:err.message
    })
  }
})

router.put("/cart/:id",authMiddleware,async(req,res)=>
{
    let cart=await Cart.findOne({userId:req.user.id});
    const item=cart.items.find(i=>i.productId===req.params.id);
    if(item) item.quantity=req.body.quantity;
    await cart.save();
    res.status(200).json({
        message:"Updated quantity",
        cart
    })
})


router.delete("/cart/:id",authMiddleware,async(req,res)=>
{
    let cart=await Cart.findOne({userId:req.user.id});
    if(!cart) return res.status(400).json({
        error:"No cart found with this id"
    })
    let x=cart.items.find(i=>req.params.id===i.productId);
    if(!x) return res.status(400).json({
            error:"No item there ith this id"
    })
    cart.items=cart.items.filter(i=>i.productId!==req.params.id);
    await cart.save();
    res.status(200).json({
        message:"Deleted item Succesfully",
        cart
    })
})

export default router;