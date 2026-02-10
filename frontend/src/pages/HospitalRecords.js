import { useEffect, useState, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { getRecords } from "../api/records";

function HospitalRecords() {
  const { role } = useContext(RoleContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const list = await getRecords();
        setRecords(list || []);
      } catch (err) {
        console.error("Failed to load records:", err);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    if (role === "staff") fetchRecords();
    else setLoading(false);
  }, [role]);

  if (role !== "staff") {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Only hospital staff can view hospital records.
      </div>
    );
  }

  if (loading) return <p className="p-6 text-gray-500">Loading records...</p>;

  const groupedRecords = records.reduce((acc, record) => {
    // Support both { patient: { patientId, name } } and legacy { patientId, patientName }
    const patient = record.patient || {
      patientId: record.patientId || "unknown",
      name: record.patientName || "Unknown",
    };
    const pid = patient.patientId;

    if (!acc[pid]) {
      acc[pid] = { patient, records: [] };
    }
    acc[pid].records.push({ ...record, patient });
    return acc;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Hospital Records
      </h1>

      {Object.keys(groupedRecords).length === 0 ? (
        <p className="text-gray-500">
          No patient records available.
        </p>
      ) : (
        Object.values(groupedRecords).map((group) => (
          <div
            key={group.patient.patientId}
            className="bg-white shadow rounded p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              Patient: {group.patient.name} (
              {group.patient.patientId})
            </h2>

            <div className="space-y-3">
              {group.records.map((record) => (
                <div
                  key={record.id}
                  className="border rounded p-4 bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">
                      Doctor:
                    </span>{" "}
                    {record.doctor}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Date:
                    </span>{" "}
                    {record.date}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Record:
                    </span>{" "}
                    {record.fileName}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Uploaded by:{" "}
                    <span className="font-semibold">
                      {record.uploadedBy}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HospitalRecords;

