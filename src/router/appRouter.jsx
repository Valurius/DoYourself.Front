import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/router";
const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} element={route.element} path={route.path} />
      ))}
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
