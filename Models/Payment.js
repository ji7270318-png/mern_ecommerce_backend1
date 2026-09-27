import mongoose from 'mongoose';

const paymentSchema=new mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
    payStatus:{type:String,enum:["pending","success","failed"],default:"pending"},
},{strict:false});

const Payment=mongoose.model('Payment',paymentSchema);
export default Payment;