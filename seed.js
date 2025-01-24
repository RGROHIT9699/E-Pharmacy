const mongoose = require('mongoose')

const Product = require('./models/Product');

const products = [
    {
        name: "Iphone 16 pro",
        image:"https://akm-img-a-in.tosshub.com/indiatoday/images/device/169649084415-pro-max-specs-1-800x800_one_to_one.jpg?VersionId=OysoHg8tJBJ1D.DvzKsc9eIrbL5xTibt",
        price: 129990,
        description: 'Phone ka baap',
    },
    {
        name:"MacBook Pro",
        image:"https://i.ytimg.com/vi/6fHbgyQOSPc/maxresdefault.jpg",
        price: 187990,
        description: 'Development mai baap',   
    },
    {
        name:"MacBook Pro",
        image:"https://i.ytimg.com/vi/6fHbgyQOSPc/maxresdefault.jpg",
        price: 187990,
        description: 'Development mai baap',   
    },
    {
        name:"Samsung S24 Ultra",
        image:"https://www.celletronic.com/wp-content/uploads/2024/01/Samsung-Galaxy-S24-ULTRA-BLACK.jpg",
        price: 129999,
        description: 'Zoom ka baap',   
    },
    {
        name:"Samsung Z Fold 6",
        image:"https://i.gadgets360cdn.com/large/samsung_galaxy_z_fold_5_review_cameras_gadgets360_1695902127311.jpg?downsize=950:*",
        price: 164999,
        description: 'Fold Phone ka baap',   
    },
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("Data Seed ho gya");
}

module.exports = seedDB;