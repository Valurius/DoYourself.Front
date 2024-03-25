import React from "react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../router/appRouter";
import "./App.css";
import { RoleProvider } from "../context/context";
export const App = () => {
  return (
    <div className="App">
      <RoleProvider>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </RoleProvider>
    </div>
  );
};
export default App;
