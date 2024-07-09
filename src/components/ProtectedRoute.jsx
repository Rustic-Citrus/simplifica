import { useAuth } from "../hooks/useAuth";

import { useEffect } from "react";

import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";

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
