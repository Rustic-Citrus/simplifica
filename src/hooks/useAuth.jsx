import { useAuthHook } from "./useAuthHook";

import { createContext, useContext, useMemo } from "react";

import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

AuthProvider.propTypes = {
  children: PropTypes.element,
};
