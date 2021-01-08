const Product = require("../models/productModel");

exports.getProducts = async (req,res) =>{
    try{
        const products = await Product.find()
        res.json(products);
    }catch(err){
        res.status(500).json({ error: err.message });
    } 
}
// only admin can create, delete, and update categories
exports.createProduct = async (req,res) =>{
    try{
        const{product_id,title,price,description,content,images,category} = req.body;
        if(!images) return res.status(400).json({msg:"No image upload"});
        const existingProduct = await Product.findOne({product_id});
        if(existingProduct) return res.status(400).json({msg:"This product already exists."});
        const newProduct = new Product({
            product_id,title:title.toLowerCase(),price,description,content,images,category
        });
        await newProduct.save();
        res.json("Created a product!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.deleteProduct = async (req,res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json("Deleted a product!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.updateProduct = async (req,res) =>{
    try{
        const {title,price,description,content,images,category} = req.body;
        await Product.findByIdAndUpdate({_id:req.params.id},
            {
                product_id,title:title.toLowerCase(),price,description,content,images,category
            });
        res.json("Updated a product!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}