import React, { useEffect, useState } from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
const Header = () => {
  const [progress, setProgress] = useState(75);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
    }
  }, [progress]);

  return (
    <header className="header-container">
      <div className="header-frame">
        <div className="profile">
          <div className="profile-info">
            <div className="profile-text"> Gar </div>
            <div className="profile-text">{progress} lvl</div>
          </div>
          <div className="progress" style={{ "--progress": `${progress}%` }}>
            <div className="bar"></div>
          </div>
        </div>
        <div className="header-buttons">
          <MyLink to="/userTasks">Задачи</MyLink>
          <MyLink to="/teams">Команды</MyLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
