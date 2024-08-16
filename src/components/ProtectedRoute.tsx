import { useAuth } from "../hooks";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, authenticate } = useAuth();

  useEffect(() => {
    if (user._id === "") {
      authenticate();
    }
  }, [user, authenticate]);

  if (user._id === "") {
    return <Navigate to="/login" />;;
  }

  return children;
};
