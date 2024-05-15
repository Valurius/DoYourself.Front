import { useState, useEffect } from "react";
import "../styles/componentStyles/Header.css";
import MyLink from "./myUi/MyLink/MyLink";
import { useAuth } from "../context/AuthContext";
import MyButton from "./myUi/MyButton/MyButton";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const [progress, setProgress] = useState(75);
  const { logout, isAuthenticated } = useAuth();
  const userRole = localStorage.getItem("permission");

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
