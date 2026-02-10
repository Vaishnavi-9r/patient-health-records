import { useState, useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { createRecord } from "../api/records";

function UploadRecord() {
  const { role } = useContext(RoleContext);

  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createRecord({
        patientName: role === "staff" ? patientName : "Self",
        patientId: role === "staff" ? patientId : "Self",
        fileName: file.name,
      });
      alert("Record uploaded successfully");
      setFile(null);
      setPatientName("");
      setPatientId("");
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-lightbg min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Upload Medical Record
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-lg"
      >
        {role === "staff" && (
          <>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full border p-2 rounded mb-3"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Patient ID"
              className="w-full border p-2 rounded mb-3"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        {file && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Selected file:
            </p>
            <p className="font-semibold">{file.name}</p>

            {file.type.startsWith("image") && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-3 w-40 rounded shadow"
              />
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Record"}
        </button>
      </form>
    </div>
  );
}

export default UploadRecord;
