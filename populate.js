// Is to populate the JSON list to a Mongo db collection
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require("./products.json");

const start = async() => {
    try{
        await connectDB(process.env.MONGO_DB_URI);
        // 1. Remove all the products that are in the database 
        await Product.deleteMany();
        // 2. Add all the products in the JSON file
        await Product.create(jsonProducts);
        // Exit the process with the success code of 0
        process.exit(0);
    } catch(err){
        console.log(err)
        process.exit(1);
    }
}

start();