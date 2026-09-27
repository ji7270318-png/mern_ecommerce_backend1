import jwt from "jsonwebtoken";
import User  from "../Models/User.js";

const Authenticated = async (req, res, next) => {
    const token =req.header("Auth");
    if(!token) return res.json({message:"Login to first"});
    const decoded=jwt.verify(token,"!@#$djf23384");
    const id=decoded.userId;
    let user= await User.findById(id);
    if(!user) return res.json({message:"User not found"});
    req.user=user;
   
    next();
}

export{Authenticated};