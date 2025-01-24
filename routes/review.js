const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const {validateReview} = require('../middleware')

router.post('/products/:id/review',  validateReview, async (req,res)=>{
    // console.log(req.body);
    try {

        const {id} = req.params
        const {rating,comment} = req.body;
        const addProduct = await Product.findById(id);
        const addReview = new Review({rating,comment});
        
        const newAvgRating = ((addProduct.avgRating * addProduct.reviews.length) + parseInt(rating)) / (addProduct.reviews.length + 1);
        addProduct.avgRating = parseFloat(newAvgRating.toFixed(1));
        addProduct.reviews.push(addReview);

        await addReview.save();
        await addProduct.save();

        req.flash('success','Thanks for your Valuable Review :)')
        res.redirect(`/products/${id}`); 
    } 
    catch(e) {
        res.status(500).render('error',{err:e.message})
    }  
        
})

module.exports = router;

