require("dotenv").config(); // Load environment variables first

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db"); // Ensure db.js properly connects to MongoDB

// Connect to MongoDB Atlas
connectToMongo();

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("Hello Sneha!");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start the server
app.listen(port, () => {
  console.log(`✅ NoteSync backend listening on port ${port}`);
});
