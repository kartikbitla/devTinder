const mongoose = require("mongoose");



const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB..."); // More informative log
        await mongoose.connect(
            "mongodb+srv://kartikbitla30:BXx9lycN2ahIwD9P@cluster0.ha2be.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection failed:", err); // Log the actual error
        throw err; // Re-throw the error after logging, important for handling it later
    }
};

module.exports = connectDB;
