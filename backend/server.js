/**
 * server.js
 * Main entry point for the Patient Health Record backend API.
 * Connects to MongoDB, sets up Express, CORS, and routes.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { login } = require("./controllers/authController");

const app = express();
const PORT = process.env.PORT || 5000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send("Backend connected successfully");
});

app.use("/api/auth", authRoutes);
app.post("/login", login);

app.use("/api/records", recordRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ========== START: Connect DB then listen ==========
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
