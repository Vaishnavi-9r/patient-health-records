import { useState, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { createAppointment } from "../api/appointments";

function ScheduleAppointment() {
  const { role } = useContext(RoleContext);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [things, setThings] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role !== "staff") {
      alert("Only hospital staff can schedule appointments");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createAppointment({
        patientName,
        patientAge,
        patientId,
        patientEmail: patientEmail || undefined,
        date,
        doctor,
        reason,
        thingsToCarry: things,
      });
      alert("Appointment scheduled");
      setPatientName("");
      setPatientAge("");
      setPatientId("");
      setPatientEmail("");
      setDate("");
      setDoctor("");
      setReason("");
      setThings("");
    } catch (err) {
      setError(err.message || "Failed to schedule appointment");
    } finally {
      setLoading(false);
    }
  };


  return (
  <div className="p-6 max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">
      Schedule Appointment
    </h1>

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded p-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Patient Age"
        value={patientAge}
        onChange={(e) => setPatientAge(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Patient Email (optional - for patient to see appointment)"
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Doctor Name"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Reason for visit"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Things to carry (comma separated)"
        value={things}
        onChange={(e) => setThings(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Appointment"}
      </button>
    </form>
  </div>
);
}
export default ScheduleAppointment;



