require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');


const express = require('express')
const app = express()
const path = require('path')
const methodoverride = require('method-override')
const mongoose = require('mongoose');
// const seedDB = require('./seed')
const ejsmate = require('ejs-mate');
const flash = require('connect-flash')
const session = require('express-session') 
const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('./models/User')

const productApi = require('./routes/api/productapi')


const productKeRoutes = require('./routes/product') 
const reviewKeRoutes = require('./routes/review')
const authKeRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const cartRoutes = require('./routes/cart')
const checkRoutes = require('./routes/checkout')

mongoose.connect('mongodb://127.0.0.1:27017/medicine')
.then(()=>{
    console.log("Mera DB Sahi chal raha hai");
})
.catch((err)=>{
    console.log("server server: DB ki toh");
    console.log(err);   
})

let configSession = {
    secret:'pharmacy',
    resave:false,
    saveUninitialized:true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}

app.engine('ejs',ejsmate);
app.set('view engine','ejs') 
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodoverride('_method'))
app.use(session(configSession))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.render('home');
})

app.use(productKeRoutes) 
app.use(reviewKeRoutes) 
app.use(authKeRoutes) 
app.use(cartRoutes);
app.use(productApi)
app.use(checkRoutes)


// yaha seed(extra) data hai
// console.log(seedDB());

passport.use(new LocalStrategy(User.authenticate()))

 

app.listen(8080,()=>{
    console.log("Server Connected");
})
