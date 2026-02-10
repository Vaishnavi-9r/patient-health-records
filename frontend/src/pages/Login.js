import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          HealthCare+
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Medical Records System
        </p>

        <button
          onClick={() => navigate("/login/patient")}
          className="bg-primary text-white py-2 rounded w-full mb-3"
        >
          Login as Patient
        </button>

        <button
          onClick={() => navigate("/login/staff")}
          className="bg-accent text-white py-2 rounded w-full"
        >
          Login as Hospital Staff
        </button>

        <p className="text-xs text-center text-gray-400 mt-6">
          Secure • Private • Patient-First
        </p>
      </div>
    </div>
  );
}

export default Login;
