/**
 * appointmentRoutes.js
 * Defines routes for appointments.
 * Mounted at /api/appointments in server.js
 */

const express = require("express");
const {
  listAppointments,
  createAppointment,
  removeAppointment,
} = require("../controllers/appointmentController");
const { authenticate, requireRole } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

// GET /api/appointments - List appointments
router.get("/", listAppointments);

// POST /api/appointments - Create appointment (staff only)
router.post("/", requireRole("staff"), createAppointment);

// DELETE /api/appointments/:id - Delete appointment
router.delete("/:id", removeAppointment);

module.exports = router;
