const Product = require("../models/productModel");


// Filtering, Sorting and Pagination
class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}; // querySting = req.query

        // Deletes words page,sort,limit from filtering section
        const excludedFields=["page","sort","limit"];
        excludedFields.forEach(el => delete(queryObj[el]));

        // Converts queryObj to a string so we can use string handling w/ mongoose filtering
        let queryStr = JSON.stringify(queryObj);
        // adds the character $ to all the fields below
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => "$" + match);
        // Converts it to JSON for filtering
        this.query.find(JSON.parse(queryStr));
        console.log("hello from filtering!");
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            // replaces "," with a blank space
            const sortBy = this.queryString.sort.split(",").join(" ");
            console.log(sortBy);
            this.query=this.query.sort(sortBy);
        }else{
            // "-"means from the most recent
            this.query = this.query.sort("-createdAt");
        }
        console.log("hello from sorting!");
        return this;
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 4;
        const skip = (page-1) * limit;
        console.log("hello from pagination!");
        // MongoDB pagination
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

exports.getProducts = async (req,res) =>{
    try{
        console.log("hello from get Products!");
        const features = new APIfeatures(Product.find(),req.query).filtering().sorting().pagination();
        const products = await features.query;
        res.json({
            status: 'success',
            result: products.length,
            products: products
        });
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
                title:title.toLowerCase(),price,description,content,images,category
            });
        res.json("Updated a product!");
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}