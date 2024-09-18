const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('connectDB function started');
    try {
        console.log('Attempting to connect to MongoDB with URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            
            serverSelectionTimeoutMS: 5000 // Timeout for server selection
        });
        console.log("MongoDB connection successful");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exits the process if there is an error
    }
    console.log('connectDB function completed');
};

module.exports = connectDB;
