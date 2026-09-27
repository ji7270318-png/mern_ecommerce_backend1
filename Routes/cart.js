import express from "express";
import { addToCart,userCart,removeproductFromCart ,clearCart,decreaseProductQty} from "../Controllers/cart.js";
import { Authenticated } from "../Middlewares/auth.js";

const router=express.Router();

//add to cart

router.post('/add', Authenticated, addToCart);

//get user cart
router.get('/user', Authenticated, userCart);

//remove product from cart
router.delete('/remove/:productId', Authenticated, removeproductFromCart);

//clear cart 
router.delete('/clear', Authenticated, clearCart);

//decrese item qty
router.post('/--qty', Authenticated, decreaseProductQty);

export default router;
