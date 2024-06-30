import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
