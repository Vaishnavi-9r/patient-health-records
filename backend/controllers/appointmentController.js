/**
 * appointmentController.js
 * Handles appointment CRUD operations using MongoDB Appointment model.
 * Staff: create, view all. Patient: view own (by patientEmail), delete own.
 */

const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

/**
 * GET /api/appointments
 * List appointments. Patient: own (by patientEmail or userId). Staff: all.
 */
const listAppointments = async (req, res) => {
  try {
    const { role, userId, email } = req.user;

    let query = {};
    if (role === "patient") {
      // Patient sees appointments where patientEmail matches their email
      query = {
        $or: [
          { patientEmail: email?.toLowerCase() },
          { "patient.patientId": "Self" },
          { "patient.patientId": userId },
        ],
      };
    }

    const appointments = await Appointment.find(query).lean();
    const formatted = appointments.map((a) => ({
      id: a._id,
      patient: a.patient,
      appointment: a.appointment,
      scheduledBy: a.scheduledBy,
      patientEmail: a.patientEmail,
      createdAt: a.createdAt,
    }));

    res.json({ success: true, appointments: formatted });
  } catch (err) {
    console.error("List appointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /api/appointments
 * Create appointment. Staff only.
 * Expects: { patientName, patientAge, patientId, patientEmail?, date, doctor, reason, thingsToCarry? }
 */
const createAppointment = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      patientName,
      patientAge,
      patientId,
      patientEmail,
      date,
      doctor,
      reason,
      thingsToCarry,
    } = req.body;

    if (!patientName || !patientId || !date || !doctor || !reason) {
      return res.status(400).json({
        success: false,
        message: "patientName, patientId, date, doctor, reason are required",
      });
    }

    const things = Array.isArray(thingsToCarry)
      ? thingsToCarry
      : (thingsToCarry || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const appointment = await Appointment.create({
      patient: { name: patientName, age: patientAge || "", patientId },
      appointment: { date, doctor, reason, thingsToCarry: things },
      scheduledBy: "hospital",
      staffRef: new mongoose.Types.ObjectId(userId),
      patientEmail: patientEmail ? patientEmail.toLowerCase() : null,
    });

    res.status(201).json({
      success: true,
      message: "Appointment scheduled",
      appointment: {
        id: appointment._id,
        patient: appointment.patient,
        appointment: appointment.appointment,
      },
    });
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/appointments/:id
 * Delete appointment. Patient or staff.
 */
const removeAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Appointment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    res.json({ success: true, message: "Appointment removed" });
  } catch (err) {
    console.error("Delete appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  listAppointments,
  createAppointment,
  removeAppointment,
};
