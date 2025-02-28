require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db"); // Ensure db.js properly connects to MongoDB

// Connect to MongoDB Atlas
connectToMongo();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("Hello Sneha! Backend is working 🎉");
});

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// ❌ Remove app.listen() (Vercel doesn't need this)
// app.listen(port, () => {
//   console.log(`✅ NoteSync backend listening on port ${port}`);
// });

// ✅ Export the Express app (Needed for Vercel)
module.exports = app;
