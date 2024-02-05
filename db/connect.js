const mongoose = require('mongoose');
// require('dotenv').config();

const ConnectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
         console.log('mongodb connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message); 
    }
}

module.exports = ConnectDB;