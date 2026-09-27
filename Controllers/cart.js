import {Cart} from "../Models/Cart.js";

//add to cart
const addToCart=async (req,res)=>{
    const { productId, title,price,qty,imgSrc } = req.body;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({userId,item:[]});
    }

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);

    if(itemIndex>-1){
        cart.items[itemIndex].qty+=qty;  
        cart.items[itemIndex].price+=price*qty;
    } else {
        cart.items.push({productId, title,price,qty,imgSrc});
    }
    await cart.save();
    res.json({message:'Item Added to Cart',cart});
}

//get user cart
const userCart=async (req,res)=>{
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart){
        return res.json({message:"Cart not found",cart:null});
    }

    res.json({message:"user cart",cart});
}

// remove product from cart
const removeproductFromCart=async (req,res)=>{
        const productId=req.params.productId;
        const userId=req.user;
        let cart=await Cart.findOne({userId});
        if(!cart){
            return res.json({message:"Cart not found",cart:null});
        }

        cart.items=cart.items.filter((item)=>item.productId.toString()!==productId);
        await cart.save();
        res.json({message:"Product removed from cart"});
    }

//clear cart
const clearCart=async (req,res)=>{
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({userId,item:[]});
    }
    else{
        cart.items=[];
    }

    await cart.save();
    res.json({message:"cart cleared",cart});
}

//decrse quantity of product in cart
const decreaseProductQty=async (req,res)=>{
    const {productId, qty} = req.body;
    const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart){
        cart=new Cart({userId,item:[]});
    }

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);

    if(itemIndex>-1){
        const item=cart.items[itemIndex];
        if(item.qty>qty){
            const pricePerUnit=item.price/item.qty;
            item.qty-=qty;
            item.price-=pricePerUnit*qty;
        }
        else{
            cart.items.splice(itemIndex,1);
        }
    } else {
        return res.json({message:'Invalid productId'});
    }
    await cart.save();
    res.json({message:'Item quantity decreased',cart});
}

export {addToCart,userCart,removeproductFromCart,clearCart,decreaseProductQty};