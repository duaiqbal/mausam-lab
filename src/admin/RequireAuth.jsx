import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { session } = useAuth();
  const location = useLocation();

  // Still loading the session — show nothing to avoid a flash
  if (session === undefined) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#1f5b4c", fontFamily: "Inter,system-ui,sans-serif" }}>Loading…</span>
      </div>
    );
  }

  if (!session) {
    // Redirect to login, preserve where they were trying to go
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
