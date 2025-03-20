const express = require('express')
const router = express.Router()
const {isLoggedIn} = require('../middleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');

router.post('/payment_gateway',isLoggedIn,async(req,res) =>{
    const {productId} = req.body;
    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).send("No Product For Payment")
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price*100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/products`,
        });
        res.redirect(303, session.url);
    } catch (error) {
        console.log(error, "Error in Payment Gateway");
        res.status(500).send("Internal Server Error");
    }
})
router.get('/success',isLoggedIn,async(req,res)=>{
    const {sessionId} = req.query.session_id;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const {customerDetails} = session;
        res.render('products/paymentSuccess',{name:customerDetails.name,email:customerDetails.email});

    } catch (error) {
        console.log(error, "Error in Payment Success");
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;