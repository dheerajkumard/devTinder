const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dheerajkumarddk:I20lpz4npxn7yqqx@namastenodejs.r4kakgq.mongodb.net/devTinder")
 };

module.exports = connectDB;