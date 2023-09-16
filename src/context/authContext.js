import React from "react";
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken); // Store token in localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // console.log("token: " + token);
  return (
    <AuthContext.Provider value={{ logout, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
