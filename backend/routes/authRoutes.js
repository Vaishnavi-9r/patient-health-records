/**
 * authRoutes.js
 * Defines authentication-related API routes.
 * Mounted at /api/auth in server.js (POST /api/auth/login)
 * POST /login kept for backward compatibility.
 */

const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/login - Patient or staff login (returns JWT)
router.post("/login", login);

module.exports = router;
