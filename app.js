// Modules
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectToDB = require("./db/connect");
const api_router = require("./routes/products");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// Vars
const app = express();
const port = process.env.PORT || 3000;

// Routes 
app.get("/", (req, res) => {
    res.send(`<h1>Welcometo Store API</h1> <a href="/api/v1/products">Products list</a>`)
});

// Middleware
app.use(express.json());
app.use('/api/v1/products', api_router);
app.use(errorHandlerMiddleware);
app.use('*', notFoundMiddleware);

const start = async() => {
    try{
        await connectToDB(process.env.MONGO_DB_URI);
        app.listen(port, () => {
            console.log(`The server is now listening on port ${port}...`)
        });
    } catch(err){
        console.log(`An error occured while connecting to the database. ${err}`)
    }
}


start();


