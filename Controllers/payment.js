import Payment from '../Models/Payment.js';
import Razorpay from 'razorpay';
import dotenv from  'dotenv'

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

// checkout controller
export const checkout = async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: 'order_rcptid_11',
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: 'created',
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);

    res.status(500).json({
      message: 'Failed to create Razorpay order',
      error: error.message,
    });
  }
};

// verify-payment controller
export const verify = async (req, res) => {
    const { orderId, paymentId, signature, amount, orderItems, userShipping, userId } = req.body;
    let orderConfirm  = await Payment.create({
        orderId,
        paymentId,  
        signature,
        amount,
        orderItems,
        userShipping,
        userId,
        payStatus: 'success',
    });
    res.json({ message: 'Payment successful', sucess:true, order: orderConfirm });
};

// user specificorder history controller
export const userOrder = async (req, res) => {
    let userId = req.user._id.toString();
    let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
    res.json({ orders });
}  

// all orders controller
export const allOrders = async (req, res) => {
    let orders = await Payment.find().sort({ orderDate: -1 });
    res.json({ orders });
} 
