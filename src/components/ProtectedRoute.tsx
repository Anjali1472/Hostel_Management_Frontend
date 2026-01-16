import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "ADMIN" | "STUDENT";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Wrong role
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
