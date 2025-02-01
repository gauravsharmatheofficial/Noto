import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { activeUser } = useAuth();

  if (activeUser) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
