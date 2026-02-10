/**
 * store.js
 * In-memory data store for records and appointments.
 * Data resets when server restarts. Replace with DB in production.
 */

// Records: { id, patient: { patientId, name }, fileName, doctor?, date, uploadedBy, userId }
const records = [];

// Appointments: { id, patient: { name, age, patientId }, appointment: { date, doctor, reason, thingsToCarry }, scheduledBy, createdAt, patientEmail? }
const appointments = [];

const getRecords = () => [...records];
const getAppointments = () => [...appointments];

const addRecord = (record) => {
  const id = Date.now();
  records.push({ id, ...record });
  return id;
};

const addAppointment = (apt) => {
  const id = Date.now();
  appointments.push({ id, ...apt });
  return id;
};

const deleteRecord = (id) => {
  const idx = records.findIndex((r) => r.id === Number(id));
  if (idx === -1) return false;
  records.splice(idx, 1);
  return true;
};

const deleteAppointment = (id) => {
  const idx = appointments.findIndex((a) => a.id === Number(id));
  if (idx === -1) return false;
  appointments.splice(idx, 1);
  return true;
};

const getRecordById = (id) => records.find((r) => r.id === Number(id));
const getAppointmentById = (id) => appointments.find((a) => a.id === Number(id));

module.exports = {
  getRecords,
  getAppointments,
  addRecord,
  addAppointment,
  deleteRecord,
  deleteAppointment,
  getRecordById,
  getAppointmentById,
};
