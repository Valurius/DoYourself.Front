// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { fetchUserById } from "../api/UserApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const updateAuthState = (token) => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  window.addEventListener("storage", (event) => {
    if (event.key === "token") {
      updateAuthState(event.newValue);
    }
  });

  const login = async (token, userId) => {
    const userf = await fetchUserById(userId);
    localStorage.setItem("permission", userf.permission);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userf.name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
