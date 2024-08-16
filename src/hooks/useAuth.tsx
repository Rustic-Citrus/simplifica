import { useAuthHook } from "./useAuthHook";
import { createContext, useContext, useMemo } from "react";
import { UserData } from "../interfaces";

const AuthContext = createContext({
  user: null,
  register: async (userData: UserData): Promise<void> => {},
  authenticate: async (userData: UserData): Promise<void> => {},
  signIn: async (userData: UserData): Promise<void> => {},
  signOut: async (): Promise<void> => {},
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
