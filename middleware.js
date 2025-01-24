const {productKaSchema,reviewKaSchema} = require('./schema')
const Product = require('./models/Product')

const validateProduct = (req,res,next) =>{
    let {name,image,price,description} = req.body;
    let {error}= productKaSchema.validate({name,image,price,description})
    if(error) {
        return res.render('error');
    }
    next();
}
const validateReview = (req,res,next)=>{
    let {rating,comment} = req.body;
    const {error} = reviewKaSchema.validate({rating,comment});
    if(error) {
        return res.render('error');
    }
    next();
}

const isLoggedIn = ((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login first')
        return res.redirect('/signin')
    }
    next();
})

const isSeller = (req,res,next)=>{
    if(!req.user.role) {
        req.flash('error','Check Again! Not your product')
        return res.redirect('/products');
    } else if (req.user.role !== 'admin') {
        req.flash('error',"You are not Authorize to do this!");
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async(req,res,next)=> {
    let {id} = req.params;
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)) {
        req.flash('error','Check Again! Not your product');
        return res.redirect('/products');
    } 
    next();
}


module.exports = {isProductAuthor,isSeller,isLoggedIn,validateProduct,validateReview}
