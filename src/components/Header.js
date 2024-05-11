import React, { useState, useCallback, useEffect } from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import MyButton from "./myUi/MyButton/MyButton";
import PersonIcon from "@mui/icons-material/Person";
import MyModal from "./myUi/MyModal/MyModal";
import MyTitle from "./myUi/MyTitle/MyTitle";

const Header = () => {
  const [progress, setProgress] = useState(75);
  const { logout, isAuthenticated } = useAuth();
  const userRole = localStorage.getItem("permission");
  const userName = localStorage.getItem("userName");
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
    }
  }, [progress]);

  return (
    <header className="header-container">
      <div className="header-frame">
        {isAuthenticated && (
          <>
            <div className="profile">
              <div className="profile-short-info">
                <div className="profile-text">хайзенберг</div>
              </div>
            </div>
            <div className="header-buttons">
              <MyLink to="/profile">
                <PersonIcon />
              </MyLink>
              {userRole === "Админ" && <MyLink to="/workers">Работники</MyLink>}
              <MyLink to="/teams">Команды</MyLink>
              <MyButton onClick={logout}>Выйти</MyButton>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
