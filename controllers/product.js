const Product = require('../models/Product');

const showAllProducts =  async(req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

const productForm = (req,res)=>{
    try {
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

}

const createProduct = async (req,res)=>{
    try {
        let {name,image,price,description} = req.body;
        await Product.create({name,image,price:parseFloat(price),description,author:req.user._id})
        req.flash('success',"Product Added Successfully!")
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

const showProduct = async (req,res) =>{
    try {
        const {id} = req.params;
        const prod = await Product.findById(id).populate('reviews');
        res.render('products/show',{prod} );

    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

const editProductForm = async (req,res)=>{
    try {
        let {id} = req.params;
        let prod = await Product.findById(id);
        res.render('products/edit',{prod});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

const updateProduct = async(req,res)=>{
    try {
        let {id} = req.params;
        let {name,image,price,description} = req.body;
        await Product.findByIdAndUpdate(id,{name,image,price,description});
        req.flash('success',"Updated Successfully!")
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

module.exports = {showAllProducts,productForm,createProduct,showProduct,editProductForm,updateProduct,deleteProduct}