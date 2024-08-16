import { useLocalStorage } from "./useLocalStorage";
import { UserService } from "../services";
import { UserRequest, UserResponse } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { DEFAULT_USER } from "../templates";

export const useAuthHook = () => {
  const [user, setUser] = useLocalStorage("user", JSON.stringify(DEFAULT_USER));
  const navigate = useNavigate();
  const { VITE_API_ENDPOINT } = import.meta.env;

  const api = new UserService(VITE_API_ENDPOINT);

  const getErrorResponse = (errorMessage: string) => {
    return {
      status: 500,
      data: {
        msg: errorMessage,
        user: DEFAULT_USER,
      },
    };
  };

  const authenticate = async (): Promise<UserResponse> => {
    try {
      const response = await api.authenticate();

      if (response.status >= 300) {
        setUser(DEFAULT_USER);
      }

      return response;
    } catch (error: any) {
      return getErrorResponse(error.message);
    }
  };

  const signIn = async (userData: UserRequest): Promise<UserResponse> => {
    try {
      const response = await api.login(userData);

      if (response.status < 300) {
        setTimeout(() => {
          setUser(response.data.user);
        }, 2000);
      }

      return response;
    } catch (error: any) {
      return getErrorResponse(error.message);
    }
  };

  const signOut = async (): Promise<UserResponse> => {
    try {
      const response = await api.logout();

      setUser(DEFAULT_USER);
      navigate("/");

      return response;
    } catch (error: any) {
      return getErrorResponse(error.message);
    }
  };

  const register = async (userData: UserRequest): Promise<UserResponse> => {
    try {
      const response = await api.register(userData);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }

      return response;
    } catch (error: any) {
      return getErrorResponse(error.message);
    }
  };

  return [user, authenticate, signIn, signOut, register];
};
