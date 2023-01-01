const mongoose = require("mongoose");
const logger = require("../config/winston");

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        logger.error(err);
    }
};

module.exports = connectDB;
