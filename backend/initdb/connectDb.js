const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const main = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to DB");
};
module.exports = main;