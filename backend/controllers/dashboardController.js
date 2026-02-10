/**
 * dashboardController.js
 * Handles dashboard stats aggregation using MongoDB.
 * Returns counts for records, appointments, patients based on role.
 */

const Record = require("../models/Record");
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

/**
 * GET /api/dashboard/stats
 * Returns { recordsCount, appointmentsCount, patientsCount }
 * Patient: own records/appointments. Staff: all.
 */
const getStats = async (req, res) => {
  try {
    const { role, userId, email } = req.user;
    const objectId = new mongoose.Types.ObjectId(userId);

    let recordsCount, appointmentsCount, patientsCount;

    if (role === "patient") {
      const recordQuery = {
        $or: [
          { uploadedByRef: objectId },
          { patientRef: objectId },
          { "patient.patientId": "Self" },
        ],
      };
      const aptQuery = {
        $or: [
          { patientEmail: email?.toLowerCase() },
          { "patient.patientId": "Self" },
          { "patient.patientId": userId },
        ],
      };
      recordsCount = await Record.countDocuments(recordQuery);
      appointmentsCount = await Appointment.countDocuments(aptQuery);
      patientsCount = 0;
    } else {
      recordsCount = await Record.countDocuments({});
      appointmentsCount = await Appointment.countDocuments({});
      const uniquePatientIds = await Record.distinct("patient.patientId");
      patientsCount = uniquePatientIds.filter((id) => id && id !== "Self").length;
    }

    res.json({
      success: true,
      stats: { recordsCount, appointmentsCount, patientsCount },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getStats,
};
