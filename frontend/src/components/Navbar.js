import { Link } from "react-router-dom";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { role, setRole } = useContext(RoleContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    setRole(null);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-between px-6 py-3
      bg-primary dark:bg-darkbg text-white">

      {/* LEFT */}
      <div className="flex gap-6 items-center">
        <span className="font-bold text-lg">PHR App</span>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/appointments">Appointments</Link>

        {role === "staff" && (
          <>
            <Link to="/appointments/new">Schedule</Link>
            <Link to="/hospital-records">Hospital Records</Link>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-white/20 hover:bg-white/30"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
