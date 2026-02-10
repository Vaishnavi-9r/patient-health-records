import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";

function ProtectedRoute({ children, allowed }) {
  const { role } = useContext(RoleContext);

  if (!role) return <Navigate to="/" />;

  if (allowed && !allowed.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
