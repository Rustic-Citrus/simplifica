import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import PropTypes from "prop-types";
import UserService from "../service/UserService.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const { VITE_API_ENDPOINT } = import.meta.env;

  const api = new UserService(VITE_API_ENDPOINT);

  const authenticate = async () => {
    try {
      const response = await api.authenticate();

      if (response.status >= 300) {
        setUser(null);
      }

      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await api.login(userData);

      if (response.status === 200 && response.data.user._id) {
        setTimeout(() => {
          setUser(response.data.user);
        }, 2000);
      }

      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      const response = await api.logout();

      setUser(null);
      navigate("/simplifica-frontend/");

      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/simplifica-frontend/login");
        }, 3000);
      }

      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      register,
      authenticate,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
