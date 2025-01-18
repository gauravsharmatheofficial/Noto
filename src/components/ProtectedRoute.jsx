import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userLogin } = useAuth();

  if (userLogin) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRoute;
