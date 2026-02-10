/**
 * Appointment.js
 * Mongoose model for appointments.
 * Staff creates appointments for patients.
 * patientEmail links to User email so patients can see their appointments.
 */

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // Embedded patient info
    patient: {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        default: "",
      },
      patientId: {
        type: String,
        required: true,
      },
    },
    // Appointment details
    appointment: {
      date: {
        type: String,
        required: true,
      },
      doctor: {
        type: String,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
      thingsToCarry: {
        type: [String],
        default: [],
      },
    },
    scheduledBy: {
      type: String,
      default: "hospital",
    },
    // Reference to staff User who created the appointment
    staffRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Patient's email - when set, links to User so patient can see this appointment
    patientEmail: {
      type: String,
      default: null,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
