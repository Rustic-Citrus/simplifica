import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import PropTypes from "prop-types";
import UserAPI from "../api/UserAPI.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const { VITE_API_ENDPOINT } = import.meta.env;

  const api = new UserAPI(VITE_API_ENDPOINT);

  const signIn = async (userData) => {
    try {
      const response = await api.login(userData);

      if (response.status === 200 && response.data.user._id) {
        setUser(response.data.user);
        navigate(`/${response.data.user._id}`);
      }

      return response;

    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await api.logout();

      setUser(null);
      navigate("/");

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
          navigate("/login");
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
