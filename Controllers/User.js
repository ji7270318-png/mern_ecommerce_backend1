import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//user registration

const register = async (req, res) => {
    console.log("REQUEST BODY:", req.body);
    const { name, email, password } = req.body;
    try {
        let user=await User.findOne({ email });
        if(user) return res.json({message:"User already exists",success:false});
        const hashPass=await bcrypt.hash(password,10);
         user = await User.create({ name, email, password:hashPass });
        res.json({ message: "User registered successfully", user,success:true });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

//user login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.json({ message: "User not found", success: false });
        const validPassword= await bcrypt.compare(password, user.password);
        if(!validPassword) return res.json({message:"Invalid Credentials",success:false});
        const token=jwt.sign({userId:user._id},"!@#$djf23384",{expiresIn:"365d"});
        res.json({ message: `Welcome ${user.name}`,token,success:true });
    }
    catch (error) {
        res.json({ message:error.message });
    }
};

// get all users
const users=async (req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }
    catch(error){
        res.json(error.message);
    }
};

// get profile
const profile=async (req,res)=>{
    res.json({user:req.user});
};

export { register, login, users, profile };