const mongoose = require('mongoose')
const reviewKaSchema = new mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    comment:{
        type:String,
        trim:true
    },user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})
 
let Review = mongoose.model('Review',reviewKaSchema)
module.exports = Review;