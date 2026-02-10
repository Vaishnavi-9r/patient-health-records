import { useEffect, useState } from "react";
import { FileText, CalendarDays, Users } from "lucide-react";
import { getStats } from "../api/dashboard";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [recordsCount, setRecordsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStats();
        setRecordsCount(stats.recordsCount ?? 0);
        setAppointmentsCount(stats.appointmentsCount ?? 0);
        setPatientsCount(stats.patientsCount ?? 0);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };
    if (role) fetchStats();
    else setLoading(false);
  }, [role]);

  if (!role) {
    return <p className="p-8">Unauthorized</p>;
  }

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  /* ===================== PATIENT DASHBOARD ===================== */
 if (role === "patient") {
  return (
    <div className="p-8 bg-lightbg min-h-screen">
      <h1 className="text-3xl font-bold mb-1">
        Welcome back 👋
      </h1>
      <p className="text-gray-600 mb-8">
        Here is a summary of your health records
      </p>

      {/* Patient Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Your Records</p>
          <h2 className="text-4xl font-bold text-primary mt-2">
            {recordsCount}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Appointments</p>
          <h2 className="text-4xl font-bold text-accent mt-2">
            {appointmentsCount}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Health Status</p>
          <p className="text-green-600 text-xl font-semibold mt-3">
            Stable ✅
          </p>
        </div>
      </div>

      {/* Guidance */}
      <div className="bg-white p-6 rounded-xl shadow mt-10">
        <h3 className="text-xl font-semibold mb-3">
          Helpful Tips
        </h3>
        <ul className="list-disc ml-5 text-gray-600 space-y-1">
          <li>Keep your records updated</li>
          <li>Attend appointments on time</li>
          <li>Carry reports during visits</li>
        </ul>
      </div>
    </div>
  );
}


  /* ===================== STAFF DASHBOARD ===================== */
  return (
    <div className="p-8 bg-lightbg min-h-screen">
      <h1 className="text-3xl font-bold mb-1">
        Hospital Staff Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Manage patients, records, and appointments
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Users />}
          title="Total Patients"
          value={patientsCount}
          color="text-primary"
        />
        <StatCard
          icon={<FileText />}
          title="Records Uploaded"
          value={recordsCount}
          color="text-accent"
        />
        <StatCard
          icon={<CalendarDays />}
          title="Appointments Scheduled"
          value={appointmentsCount}
          color="text-green-600"
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ActionCard
          title="Upload Patient Record"
          description="Add new medical records for patients"
          link="/upload"
          color="bg-primary"
        />
        <ActionCard
          title="Schedule Appointment"
          description="Create and manage patient appointments"
          link="/appointments/new"
          color="bg-accent"
        />
      </div>
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
      <div className={`${color} w-10 h-10`}>{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function ActionCard({ title, description, link, color }) {
  return (
    <a
      href={link}
      className={`${color} text-white p-6 rounded-xl shadow hover:opacity-90 transition`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 opacity-90">{description}</p>
    </a>
  );
}

export default Dashboard;

