import {Address} from '../Models/Address.js';

//add address
const addAddress=async (req,res)=>{
    const {fullName,address,city,state,country,pincode,phoneNumber}=req.body;
    const userId=req.user;
    try {
        let userAddress = await  Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });

        await userAddress.save();
        res.json({success:true,message:"Address added",userAddress});
    }
    catch (error) {
        res.status(500).json({success:false,message:"Error adding address",error});
    }
};

const getAddress=async (req,res)=>{
    let address=await Address.find({userId:req.user}).sort({createdAt: -1});
    res.json({message:"All address",userAddress:address[0]});

};
 
export {addAddress,getAddress};
