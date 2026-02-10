/**
 * recordController.js
 * Handles medical record CRUD operations using MongoDB Record model.
 * Patient: own records. Staff: all records.
 */

const Record = require("../models/Record");
const mongoose = require("mongoose");

/**
 * GET /api/records
 * List records. Patient: own. Staff: all.
 */
const listRecords = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const objectId = new mongoose.Types.ObjectId(userId);

    let query = {};
    if (role === "patient") {
      query = {
        $or: [
          { uploadedByRef: objectId },
          { patientRef: objectId },
          { "patient.patientId": "Self" },
        ],
      };
    }

    const records = await Record.find(query).lean();
    const formatted = records.map((r) => ({
      id: r._id,
      patient: r.patient,
      fileName: r.fileName,
      doctor: r.doctor,
      date: r.date,
      uploadedBy: r.uploadedBy,
    }));

    res.json({ success: true, records: formatted });
  } catch (err) {
    console.error("List records error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /api/records
 * Create a record. Expects: { patientName?, patientId?, fileName, doctor? }
 * Staff: must provide patientName, patientId. Patient: uses "Self".
 */
const createRecord = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { patientName, patientId, fileName, doctor } = req.body;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: "fileName is required",
      });
    }

    const patient = { patientId: patientId || "Self", name: patientName || "Self" };
    let patientRef = null;

    if (role === "staff") {
      if (!patientName || !patientId) {
        return res.status(400).json({
          success: false,
          message: "patientName and patientId are required for staff",
        });
      }
    } else {
      patient.patientId = "Self";
      patient.name = "Self";
      patientRef = new mongoose.Types.ObjectId(userId);
    }

    const record = await Record.create({
      patient,
      fileName,
      doctor: doctor || "",
      uploadedBy: role,
      uploadedByRef: new mongoose.Types.ObjectId(userId),
      patientRef,
    });

    res.status(201).json({
      success: true,
      message: "Record uploaded successfully",
      record: {
        id: record._id,
        patient: record.patient,
        fileName: record.fileName,
      },
    });
  } catch (err) {
    console.error("Create record error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/records/:id
 * Delete a record. Staff only.
 */
const removeRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Record.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    console.error("Delete record error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  listRecords,
  createRecord,
  removeRecord,
};
