import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchUserById } from "../api/UserApi";

const RoleContext = createContext();

export const useRoleContext = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");

  const getUser = async () => {
    try {
      const userf = await fetchUserById(userId);
      setUser(userf);
      localStorage.removeItem("permition");
      localStorage.setItem("permition", user.permition);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  return (
    <RoleContext.Provider value={{ userRole, user, getUser }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
