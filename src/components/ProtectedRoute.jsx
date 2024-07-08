import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { user, authenticate } = useAuth();

  useEffect(() => {
    authenticate();
  }, [authenticate, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
