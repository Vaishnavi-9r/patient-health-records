/**
 * Record.js
 * Mongoose model for medical records.
 * Records can be uploaded by patients (for self) or staff (for any patient).
 * patientRef links to User when the patient has an account (for filtering).
 */

const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    // Embedded patient info (flexible - staff uses patientId/name, patient uses "Self")
    patient: {
      patientId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
    },
    doctor: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
    // Who uploaded this record (staff or patient)
    uploadedBy: {
      type: String,
      enum: ["patient", "staff"],
      required: true,
    },
    // Reference to User who uploaded (for patient: their own records)
    uploadedByRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to patient User when they have an account (for filtering patient's records)
    patientRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);
