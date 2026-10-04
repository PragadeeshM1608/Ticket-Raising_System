const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Route imports
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
// Mount Routes
app.use("/api/auth", authRoutes);       // Login/Register
app.use("/api/tickets", ticketRoutes);  // Ticket Routes


// app.use(express.static(path.join(__dirname, 'frontend')));

// // Fallback for frontend routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'ticket_details.html'));
// }); 

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
