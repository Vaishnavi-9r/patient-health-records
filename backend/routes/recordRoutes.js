/**
 * recordRoutes.js
 * Defines routes for medical records.
 * Mounted at /api/records in server.js
 */

const express = require("express");
const {
  listRecords,
  createRecord,
  removeRecord,
} = require("../controllers/recordController");
const { authenticate, requireRole } = require("../middleware/auth");

const router = express.Router();

router.use(authenticate);

// GET /api/records - List records (patient: own, staff: all)
router.get("/", listRecords);

// POST /api/records - Create record
router.post("/", createRecord);

// DELETE /api/records/:id - Delete record (staff only)
router.delete("/:id", requireRole("staff"), removeRecord);

module.exports = router;
