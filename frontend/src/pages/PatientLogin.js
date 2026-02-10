import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { login } from "../api/auth";

function PatientLogin() {
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const data = await login(email, password, "patient");
      if (data.success && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setRole(data.user.role);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Server error");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Patient Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default PatientLogin;



