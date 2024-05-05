// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userId, setUserId] = useState("");

  const updateAuthState = (token) => {
    if (token) {
      setIsAuthenticated(true);
      setUserId();
    } else {
      setIsAuthenticated(false);
    }
  };

  window.addEventListener("storage", (event) => {
    if (event.key === "token") {
      updateAuthState(event.newValue);
    }
  });

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("userId", userId);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
