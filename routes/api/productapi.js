const express = require('express') 
const router = express.Router()
let {isLoggedIn} = require('../../middleware')
const User = require('../../models/User')

router.post('/product/:productId/like', isLoggedIn ,async(req, res)=>{
    let {productId} = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);
    const option = isLiked? '$pull' : '$addToSet';

    req.user = await User.findByIdAndUpdate(req.user._id,{[option]:{wishList:productId}},{new:true})
    res.send('Done ');
})

module.exports = router;