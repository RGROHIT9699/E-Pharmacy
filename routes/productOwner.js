const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {isLoggedIn,isSeller} = require('../middleware');

router.get('/seller/profile', isLoggedIn, isSeller ,async (req,res)=>{
    res.render('products/sellerProfile');
})

router.get('/seller/products', isLoggedIn, isSeller,async(req,res)=>{
    try {
        // fetch all the products of the seller
        const products = await Product.find({author:req.user._id}).populate('reviews');
        res.render('products/sellerProduct',{products});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;