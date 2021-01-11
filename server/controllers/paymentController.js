const Payments = require("../models/paymentModel");
const User = require("../models/userModel");
const Products = require("../models/productModel");
const Payment = require("../models/paymentModel");

exports.getPayments = async (req,res) =>{
    try{
        const payments = await Payment.find();
        res.json(payments);
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}

exports.createPayment = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("name email");
        if(!user) return res.status(400).json({msg:"User does not exist!"});

        const {cart,paymentID,address} = req.body;
        const {_id,name,email} = user;

        const newPayment = new Payment({
            user_id:_id,name,email,cart,paymentID,address
        });
        res.json({newPayment});
    }catch(err){

    }
}