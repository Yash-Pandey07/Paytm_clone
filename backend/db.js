// backend/db.js
require("dotenv").config();

const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/paytm";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000 
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Check the connection status
const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connected successfully");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Graceful shutdown handling
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = mongoose;
