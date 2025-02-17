import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  console.log("Auth Status:", isAuthenticated); // Debugging
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
