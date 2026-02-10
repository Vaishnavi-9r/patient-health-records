/**
 * dashboardRoutes.js
 * Defines routes for dashboard stats.
 * Mounted at /api/dashboard in server.js
 */

const express = require("express");
const { getStats } = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

// GET /api/dashboard/stats - Get counts for dashboard
router.get("/stats", getStats);

module.exports = router;
