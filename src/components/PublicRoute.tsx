import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (user._id !== "") {
    return <Navigate to={`/${user._id}`}/>;
  }

  return children;
};

