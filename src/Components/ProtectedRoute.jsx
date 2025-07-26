import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AuthContext from "./Account/Auth";

export default function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
