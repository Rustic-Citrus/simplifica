import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={`/simplifica-frontend/${user._id}`} />;
  }
  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.element,
};
