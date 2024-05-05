import React, { useEffect, useState } from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import MyButton from "./myUi/MyButton/MyButton";
const Header = () => {
  const [progress, setProgress] = useState(75);
  const { logout, isAuthenticated } = useAuth();
  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
    }
  }, [progress]);

  const click = () => {
    logout();
  };
  return (
    <header className="header-container">
      <div className="header-frame">
        {isAuthenticated ? (
          // Если пользователь авторизован, показываем профиль и кнопки
          <>
            <div className="profile">
              <div className="profile-short-info">
                <Link to="/profile" className="profile-text">
                  dsf
                </Link>
                <div className="profile-text">{progress} lvl</div>
              </div>
              <div
                className="progress"
                style={{ "--progress": `${progress}%` }}
              >
                <div className="bar"></div>
              </div>
            </div>
            <div className="header-buttons">
              <MyLink to="/userTasks">Задачи</MyLink>
              <MyLink to="/teams">Команды</MyLink>
              <MyButton onClick={click}>Выйти</MyButton>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
