import { Navigate } from "react-router-dom";

export default function ProtectedTeamRoute({ children }) {
  const token = localStorage.getItem("teamToken");

  if (!token) return <Navigate to="/login" replace />;

  // Basic check: JWT has 3 parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    localStorage.removeItem("teamToken");
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(parts[1]));
    // Check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("teamToken");
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.removeItem("teamToken");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}