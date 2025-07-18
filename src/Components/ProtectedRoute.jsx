import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Internal_Navigate = true;
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!Internal_Navigate) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
