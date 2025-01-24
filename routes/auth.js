const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

router.post('/register', async (req, res) => {
    try{
        let{email,username,password,role}=req.body; 
        const user = new User({email,username,role});
        const newUser = await User.register(user,password);
        // res.redirect('/signin');   
        req.login(newUser,function(err){
            if(err) return next(err);
            req.flash('success','Welcome to the community!')
            return res.redirect('/products');
        }) 
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

router.get('/signin',(req,res)=>{
    res.render('auth/signin');
})

router.post('/signin',
    passport.authenticate('local',{
        failureRedirect:'/signin',
        failureMessage:true
    }),
    function (req,res){
    req.flash('success',`Welcome Back ${req.user.username}`)
    res.redirect(`/products`)
}) 

router.get('/signout',(req,res)=>{
    req.logout(()=>{
    req.flash('success',"Visit Again!")
    res.redirect('/signin')
    })
})


module.exports = router
