import express from 'express';
import {checkout,verify,userOrder,allOrders} from '../Controllers/payment.js';
import {Authenticated} from '../Middlewares/auth.js';

const router=express.Router();

// checkout route
router.post('/checkout', checkout);

// verify-payment route
router.post('/verify-payment', verify);

// user order history route
router.get('/userorders',Authenticated,userOrder);
// all orders route
router.get('/orders',allOrders);

export default router;