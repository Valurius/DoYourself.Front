import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const useRoleContext = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("admin"); // Здесь может быть логика получения роли пользователя

  return (
    <RoleContext.Provider value={{ userRole }}>{children}</RoleContext.Provider>
  );
};
