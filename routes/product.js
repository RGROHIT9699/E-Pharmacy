const express = require('express')
const router = express.Router()
const Product = require('../models/Product');
const Review = require('../models/Review')
const {validateProduct,isLoggedIn,isSeller,isProductAuthor} = require('../middleware')
const {showAllProducts,productForm,createProduct,showProduct,editProductForm,updateProduct,deleteProduct} = require('../controllers/product');


router.get('/products',showAllProducts);

router.get('/showBook/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        const price = product.price;
        if(!product) {
            return res.status(404).send("No Product Found");

        }
        res.render('products/booked',{
            productId: product._id,
            name : product.name,
            price: product.price,            
        });
    } catch(e){
            console.error(e);
            res.status(500).send("Server Error");
    }
});

router.get('/product/new',isLoggedIn, isSeller,productForm)

router.post('/products', validateProduct,isLoggedIn,isSeller,createProduct )

router.get('/products/:id',isLoggedIn,showProduct)

router.get('/products/:id/edit',isLoggedIn,isProductAuthor,editProductForm)

router.patch('/products/:id',isLoggedIn, validateProduct,isProductAuthor,updateProduct )

router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct )

module.exports = router;