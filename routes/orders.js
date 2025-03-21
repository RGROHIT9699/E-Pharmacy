const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const {isLoggedIn} = require('../middleware');

router.get('/user/orders', isLoggedIn, async (req,res)=>{
    try {
        // Fetch all orders for the logged-in user and populate product details
        const orders = await Order.find({ user: req.user._id }).populate('products.product');  

        if (!orders || orders.length === 0) {
            return res.render('products/order', { orders: [] }); // Render with an empty list
        }
        // Render the orders page with the fetched orders
        res.render('products/order', { orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/');
    }
})

module.exports = router;