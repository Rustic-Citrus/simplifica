import { useAuth } from "../hooks/useAuth";

import { useEffect } from "react";

import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, authenticate } = useAuth();

  useEffect(() => {
    const waitThenCheckUser = async () => {
      setTimeout(() => {
        if (!user) {
          return <Navigate to="/login" />;
        }

        authenticate();
      }, 500);
    };

    waitThenCheckUser();
  }, [user, authenticate]);

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
