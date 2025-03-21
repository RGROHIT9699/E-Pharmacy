const express = require('express')
const router = express.Router()
const {validateProduct,isLoggedIn,isSeller,isProductAuthor} = require('../middleware')
const {showAllProducts,productForm,createProduct,showProduct,editProductForm,updateProduct,deleteProduct} = require('../controllers/product');


router.get('/products',showAllProducts);

router.get('/product/new',isLoggedIn, isSeller,productForm)

router.post('/products', validateProduct,isLoggedIn,isSeller,createProduct )

router.get('/products/:id',isLoggedIn,showProduct)

router.get('/products/:id/edit',isLoggedIn,isProductAuthor,editProductForm)

router.patch('/products/:id',isLoggedIn, validateProduct,isProductAuthor,updateProduct )

router.delete('/products/:id',isLoggedIn,isProductAuthor,deleteProduct )

module.exports = router;