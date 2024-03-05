import React from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
const Header = () => {
  return (
    <header className="header-container">
      <link rel="icon" href="../../../public/favicon.ico" />
      <div className="header-frame">
        <h1 className="header-title">DoYourself</h1>
        <div className="header-buttons">
          <MyLink to="/tasks">Задачи</MyLink>
          <MyLink to="/teams">Команды</MyLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
