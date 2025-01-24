const mongoose = require('mongoose');
const Review = require('./Review')
const productKaSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:true
    },
    image:{
        type:String,
        trim:true,
    } ,
    price:{
        type:Number,
        required: true,
        min:0,

    } ,
    description:{
        type:String,
        trim:true
    },
    avgRating: {
        type: Number,
        default:0
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'   
    }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

productKaSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0) {
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})


let Product = mongoose.model('Product',productKaSchema)
module.exports = Product;

