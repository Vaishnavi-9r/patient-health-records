/**
 * seed.js
 * Optional seed script to create sample users and data.
 * Run: node scripts/seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Record = require("../models/Record");
const Appointment = require("../models/Appointment");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/patient-health-record";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Create sample users (User.create triggers password hash)
    let patientUser = await User.findOne({ email: "patient@test.com" });
    if (!patientUser) {
      patientUser = await User.create({
        email: "patient@test.com",
        password: "patient123",
        role: "patient",
      });
    }

    let staffUser = await User.findOne({ email: "staff@test.com" });
    if (!staffUser) {
      staffUser = await User.create({
        email: "staff@test.com",
        password: "staff123",
        role: "staff",
      });
    }

    console.log("Sample users:");
    console.log("  Patient: patient@test.com / patient123");
    console.log("  Staff: staff@test.com / staff123");

    // Optional: create sample records and appointments
    const existingRecords = await Record.countDocuments();
    if (existingRecords === 0) {
      await Record.create({
        patient: { patientId: "P001", name: "John Doe" },
        fileName: "blood_report.pdf",
        doctor: "Dr. Smith",
        uploadedBy: "staff",
        uploadedByRef: staffUser._id,
      });
      console.log("Sample record created");
    }

    const existingAppts = await Appointment.countDocuments();
    if (existingAppts === 0) {
      await Appointment.create({
        patient: { name: "John Doe", age: "35", patientId: "P001" },
        appointment: {
          date: "2025-02-15",
          doctor: "Dr. Smith",
          reason: "Follow-up",
          thingsToCarry: ["Reports", "Insurance card"],
        },
        staffRef: staffUser._id,
        patientEmail: "patient@test.com",
      });
      console.log("Sample appointment created");
    }

    console.log("Seed completed");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
