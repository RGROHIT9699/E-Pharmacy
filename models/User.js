const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userKaSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true,
    },
    role:{
        type:String,
        require: true,
    },
    wishList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }
    ]
})
 
userKaSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userKaSchema)
module.exports = User;