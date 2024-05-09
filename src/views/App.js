import React from "react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../router/appRouter";
import "./App.css";
import { RoleProvider } from "../context/RoleContext";
import { AuthProvider } from "../context/AuthContext";

export const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
export default App;
