import React from "react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../router/appRouter";
import "./App.css";
export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};
export default App;
