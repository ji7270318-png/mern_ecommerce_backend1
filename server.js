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
// app.use(cors({
//     // origin:true,
//     origin: "http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true
// }));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://mern-ecomerce-frontend-sandy.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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
    process.env.MONGO_URI,
    { dbName: "mern_e_commerce" }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
}); 

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
export default app;
