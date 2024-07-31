import { useLocalStorage } from "./useLocalStorage";
import UserService from "../service/UserService";

import { useNavigate } from "react-router-dom";

export const useAuthHook = () => {
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

  return [user, authenticate, signIn, signOut, register];
};
