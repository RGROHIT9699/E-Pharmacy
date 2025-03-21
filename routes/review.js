const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Review = require('../models/Review')
const {validateReview,isLoggedIn} = require('../middleware')

router.post('/products/:id/review',  validateReview, async (req,res)=>{
    // console.log(req.body);
    try {

        const {id} = req.params
        const {rating,comment} = req.body;
        const addProduct = await Product.findById(id);
        const addReview = new Review({rating,comment,user:req.user._id});
        
        const newAverageRating = ((addProduct.avgRating * addProduct.reviews.length) + parseInt(rating)) / (addProduct.reviews.length + 1);
        addProduct.avgRating = parseFloat(newAverageRating.toFixed(1));


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

router.delete('/products/:productid/review/:reviewid', isLoggedIn, async (req, res) => {
    try {
        const { productid, reviewid } = req.params;
        const review = await Review.findById(reviewid);

        // Check if the logged-in user is the owner of the review
        if (!review.user.equals(req.user._id)) {
            req.flash('error', 'You are not authorized to delete this review.');
            return res.redirect(`/products/${productid}`);
        }

        await Review.findByIdAndDelete(reviewid);

        // Remove the review from the product's reviews array
        await Product.findByIdAndUpdate(productid, { $pull: { reviews: reviewid } });

        req.flash('success', 'Review deleted successfully!');
        res.redirect(`/products/${productid}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
});

module.exports = router;

