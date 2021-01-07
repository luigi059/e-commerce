const User = require("../models/userModel");

// Check if user is an admin
const authAdmin = async (req,res,next) =>{
    try{
        const user = await User.findOne({
            _id: req.user.id
        });
        if(user.role===0) return res.status(400).json({msg:"Admin access denied!"});
        next();
    }catch{
        res.status(500).json({ msg: err.message });
    }
}

module.exports = authAdmin;