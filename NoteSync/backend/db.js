const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // Ensure .env contains MONGO_URI

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop the app if the database connection fails
    }
};

module.exports = connectToMongo;
