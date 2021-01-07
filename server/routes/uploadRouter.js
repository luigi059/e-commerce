const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// uploading images via cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

// only admin can upload and delete images
router.post("/upload",auth,authAdmin,(req,res)=>{
    try{
        console.log(req.files);
        // 1) validation
        if(!req.files || Object.keys(req.files).length===0) return res.status(400).json({msg:"No file was uploaded!"});
        const file = req.files.file;
        // 2) check if file size is too large
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:"Image size too large!"});
        } 
        // 3) check if file format is right
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:"File uploaded is not an image!"});
        } 
        // 4) if everything is ok, then upload image to cloudinary
        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"ecommerce"},async(err,result)=>{
            if(err) throw err;
            removeTmp(file.tempFilePath);
            res.json({public_id:result.public_id,url:result.secure_url});
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})
// Delete images
router.post("/destroy",auth,authAdmin,(req,res)=>{
    try{
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg:"No images selected!"});

        cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
            if(err) throw err;
            res.json({msg:"Deleted image"});
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})
// remove "tmp" files when uploading images
const removeTmp = (path) =>{
    fs.unlink(path,err=>{
        if(err) throw err;
    });
}
module.exports = router;