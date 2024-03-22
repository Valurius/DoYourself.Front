import React, { useEffect, useState } from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
import MyText from "./myUi/MyText/MyText";
const Header = () => {
  const [progress, setProgress] = useState(75);

  useEffect(() => {
    // Здесь вы можете получить данные о прогрессе пользователя, например, из API
    // Предположим, что прогресс изначально равен 75%
    if (progress >= 100) {
      setProgress(0); // Сброс прогресса до 0, если он достиг 100
    }
  }, [progress]);

  const Plus = () => {
    setProgress(progress + 5);
  };

  return (
    <header className="header-container">
      <div className="header-frame">
        <div class="profile">
          <div class="profile-info">
            <div class="profile-text"> Gar </div>
            <div class="profile-text">{progress} lvl</div>
          </div>

          <div class="progress" style={{ "--progress": `${progress}%` }}>
            <div class="bar"></div>
          </div>
        </div>
        <div className="header-buttons">
          <button onClick={Plus}></button>
          <MyLink to="/tasks">Задачи</MyLink>
          <MyLink to="/teams">Команды</MyLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
