import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.js";
import bodyParser from "express";
import cors from "cors";
import productRoutes from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import paymentRouter from "./Routes/payment.js";




const app = express();

app.use(bodyParser.json());
app.use(cors({
    // origin:true,
    origin: "https://mern-ecomerce-frontend-j2lezog9e-navneet-maurya.vercel.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));


// home route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the E-commerce API" });
});

// user routers
app.use('/api/users', userRoutes);

// product routers
app.use('/api/products', productRoutes);

// cart router

app.use('/api/cart',cartRouter);

// address router

app.use('/api/address', addressRouter);

// payment router

app.use('/api/payment', paymentRouter);

mongoose.connect(
    "mongodb+srv://navneetmaurya2005_db_user:56TytR7COxTcwr0y@cluster0.zlpd4qc.mongodb.net/ecommerce?retryWrites=true&w=majority",
    { dbName: "mern_e_commerce" }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});    
export default app;
