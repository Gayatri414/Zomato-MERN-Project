const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error:", err));
}

module.exports = connectDB;