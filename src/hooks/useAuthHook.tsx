import { useLocalStorage } from "./useLocalStorage";
import { UserService } from "../services";
import { UserData, Response } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

export const useAuthHook = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const navigate = useNavigate();
  const { VITE_API_ENDPOINT } = import.meta.env;

  const api = new UserService(VITE_API_ENDPOINT);

  const authenticate = async (): Promise<AxiosResponse | Response | void> => {
    try {
      const response = await api.authenticate();

      if (response.status >= 300) {
        setUser(null);
      }

      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signIn = async (
    userData: UserData
  ): Promise<AxiosResponse | Response | void> => {
    try {
      const response = await api.login(userData);

      if (response.status < 300) {
        setTimeout(() => {
          setUser(response.data.user);
        }, 2000);
      }

      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signOut = async (): Promise<AxiosResponse | Response | void> => {
    try {
      const response = await api.logout();

      setUser(null);
      navigate("/");

      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const register = async (
    userData: UserData
  ): Promise<AxiosResponse | Response | void> => {
    try {
      const response = await api.register(userData);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }

      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return [user, authenticate, signIn, signOut, register];
};
