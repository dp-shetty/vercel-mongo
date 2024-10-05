const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI;

// Home route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Function to connect to MongoDB if not connected
const connectToMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
};

// Export the Express app as a Vercel serverless function
module.exports = async (req, res) => {
  await connectToMongoDB();  // Ensure MongoDB connection before handling request
  return app(req, res);
};
