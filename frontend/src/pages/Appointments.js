import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment as deleteAppointmentApi } from "../api/appointments";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const list = await getAppointments();
      setAppointments(list || []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      await deleteAppointmentApi(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      alert("Appointment removed");
    } catch (err) {
      alert(err.message || "Failed to remove appointment");
    }
  };

  if (loading) return <p className="text-gray-500">Loading appointments...</p>;

  return (
    <div className="bg-gray-50 dark:bg-darkbg">
      <h1 className="text-2xl font-bold mb-6">
        Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments scheduled.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const ap = apt.appointment || {};
            return (
              <div key={apt.id} className="bg-white shadow rounded p-6">
                <p className="text-gray-500 mb-2">Upcoming Appointment</p>
                <p className="font-semibold text-lg">Dr. {ap.doctor}</p>
                <p className="text-gray-600 mt-1">{ap.date}</p>
                <p className="mt-3">
                  <span className="font-semibold">Reason:</span> {ap.reason}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Carry:</span>{" "}
                  {(ap.thingsToCarry || []).join(", ") || "None"}
                </p>
                <button
                  onClick={() => deleteAppointment(apt.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Appointment
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Appointments;
