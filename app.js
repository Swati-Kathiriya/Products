const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const ConnectDB = require('./db/connect')

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const PORT =  process.env.PORT|| 5000;

//middleware
const products_routes = require("./routes/products");
app.use("/api/products",products_routes)

app.get("/",(req,res) => {
    res.send(`<h1>Homepage</h1>`)
});

const start = async() => {
    try {
        await ConnectDB(process.env.MONGODB_URL);
        app.listen(PORT,() => {
            console.log(`${PORT} Yes I am connected`);
        })
    } catch (error) {
        console.log(error)
    }
}
start();