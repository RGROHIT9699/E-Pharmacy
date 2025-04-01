const mongoose = require('mongoose')

const Product = require('./models/Product');

const products = [
    {
        name: "Protinex",
        image:"https://m.media-amazon.com/images/I/81gBcDFLuQL.jpg",
        price: 485,
        description: 'Bext Protein Ever',
    },
    {
        name:"Liv 52",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVBPWYX-OLxlbJoFI2RAmrFX2fOBeIfhwK6A&s",
        price: 187,
        description: 'Lever Ki Tablet',   
    },
    {
        name:"Fast Relief",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS0tYBQajj7VJC0LEInktjS7Kl9tQo4X47ow&s",
        price: 80,
        description: 'Best Pain Relief Ointment',   
    },
    {
        name:"Zandu Pancharishtha",
        image:"https://images.apollo247.in/pub/media/catalog/product/Z/A/ZAN0027_5-AUG23_1.jpg?tr=q-80,f-webp,w-400,dpr-6,c-at_max",
        price: 165,
        description: 'Best For Digestion',   
    },
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("Data Seed ho gya");
}

module.exports = seedDB;