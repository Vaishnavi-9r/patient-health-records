import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { RoleContext } from "../context/RoleContext";
import { login } from "../api/auth";

function StaffLogin() {
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Enter staff credentials");
      return;
    }
    setError("");
    try {
      const data = await login(email, password, "staff");
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
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-accent mb-6">
          Hospital Staff Login
        </h2>

        <input
          type="email"
          placeholder="Staff Email"
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

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="bg-accent text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default StaffLogin;
