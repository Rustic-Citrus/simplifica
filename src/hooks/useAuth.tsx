import { useAuthHook } from "./useAuthHook";
import { createContext, useContext, useMemo } from "react";

const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  register: () => {},
  authenticate: () => {},
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
