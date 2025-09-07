import mongoose  from "mongoose";

const cartSchema=new mongoose.Schema({
    items:[
        {
            productId:String,
            ProductName:String,
            price:Number,
            quantity:Number,
        }
    ],
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}
})

export default mongoose.model("Cart",cartSchema);