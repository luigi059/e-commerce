const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res,next) => {
    try {
        const {name,email,password} = req.body;
        // 1) validation
        if(!name || !email || !password) return res.status(400).json({ msg: "Not all fields have been entered." });
        // 2) Check if existing user exists
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({msg:"This email already exists."});
        // 3) Password validator
        if(password.length < 6) return res.status(400).json({msg:"Password is at least 6 characters long."});
        // 4) Password Encryption
        const passwordHash = await bcrypt.hash(password,10);
        // 5) if everything is ok, create a new user and save to mongoDB
        const newUser = new User({name,email,password:passwordHash});
        await newUser.save();
        // Then create jsonwebtoken for authentication
        const accessToken = createAccessToken({id:newUser._id});
        const refreshToken = createRefreshToken({id:newUser._id});
        // Creates cookie for authentication
        res.cookie("refreshtoken",refreshToken,{
            httpOnly:true,
            path:"/user/refresh_token"
        });
        res.json({newUser});
    }catch(err){
        res.status(500).json({ error: err.message });
    }   
}
// Authentication via cookies   
exports.refreshToken = (req,res,next) => {
    try{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg:"Please Login or Register"});
        // Verifying cookie
        jwt.verify(rf_token,process.env.JWT_REFRESH_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg:"Please Login or Register"});
            const accessToken = createAccessToken({id:user.id});
            res.json({user,accessToken});
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
// Creating jwt tokens
const createAccessToken = (user) =>{
    return jwt.sign(user,process.env.JWT_ACCESS_SECRET,{expiresIn:"1d"});
}
const createRefreshToken = (user) =>{
    return jwt.sign(user,process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
}