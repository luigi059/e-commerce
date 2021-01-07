const Category = require("../models/categoryModel");

exports.getCategories = async (req,res) =>{
    try{
        const categories = await Category.find()
        res.json(categories);
    }catch(err){
        res.status(500).json({ error: err.message });
    } 
}
// only admin can create, delete, and update categories
exports.createCategory = async (req,res) =>{
    try{
        const{name} = req.body;
        const existingCategory = await Category.findOne({name});
        if(existingCategory) return res.status(400).json({msg:"This email already exists."});
        const newCategory = new Category({name});
        await newCategory.save();
        res.json("Created a category!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.deleteCategory = async (req,res) =>{
    try{
        await Category.findByIdAndDelete(req.params.id);
        res.json("Deleted a category!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}
exports.updateCategory = async (req,res) =>{
    try{
        const {name} = req.body;
        await Category.findByIdAndUpdate({_id:req.params.id},{name});
        res.json("Updated a category!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}