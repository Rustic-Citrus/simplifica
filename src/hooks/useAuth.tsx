import { useAuthHook } from "./useAuthHook";
import { createContext, useContext, useMemo } from "react";
import { UserRequest, UserResponse } from "../interfaces";
import { DEFAULT_USER_RESPONSE, DEFAULT_USER } from "../templates";

const AuthContext = createContext({
  user: DEFAULT_USER,
  register: async (userData: UserRequest): Promise<UserResponse> =>
    DEFAULT_USER_RESPONSE,
  authenticate: async (): Promise<UserResponse> =>
    DEFAULT_USER_RESPONSE,
  signIn: async (userData: UserRequest): Promise<UserResponse> =>
    DEFAULT_USER_RESPONSE,
  signOut: async (): Promise<UserResponse> => DEFAULT_USER_RESPONSE,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, authenticate, signIn, signOut, register] = useAuthHook();

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      register,
      authenticate,
    }),
    [user, signIn, signOut, register, authenticate]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
