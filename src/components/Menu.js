import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../styles/componentStyles/Menu.css";
import GroupsIcon from "@mui/icons-material/Groups";
import ManIcon from "@mui/icons-material/Man";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Market from "@mui/icons-material/LocalGroceryStoreRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { fetchTeamById } from "../api/TeamApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MenuBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen] = useState(true);
  const [team, setTeam] = useState({});
  const navigate = useNavigate();
  const { teamId } = useParams();
  localStorage.setItem("teamTitle", team.title);

  const savedTeamTitle = localStorage.getItem("teamTitle");
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const loadTeam = async () => {
    if (!team || team.id !== teamId) {
      try {
        const teamData = await fetchTeamById(teamId);
        setTeam(teamData);
      } catch (error) {
        console.error("Ошибка при загрузке команд:", error);
      }
    }
  };

  useEffect(() => {
    loadTeam();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [teamId]);

  const breakpoint = 1024;

  return (
    <div style={{ display: "flex", height: "100vh", width: "10vw" }}>
      <Sidebar
        className="sidebar"
        style={{
          minWidth: isMenuOpen
            ? windowWidth > breakpoint
              ? "220px"
              : "70px"
            : "70px",
        }}
      >
        <Menu className="menu">
          <MenuItem
            className="menu-item"
            icon={<ManIcon />}
            onClick={() => navigate(`/${teamId}/myTasks/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Мои задачи"}
          </MenuItem>

          <MenuItem
            className="menu-item"
            icon={<GroupsIcon />}
            onClick={() => navigate(`/${teamId}/projects/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Проекты"}
          </MenuItem>

          <MenuItem
            className="menu-item"
            icon={<QueryStatsIcon />}
            onClick={() => navigate(`/${teamId}/statistics/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Статистика"}
          </MenuItem>

          <MenuItem
            className="menu-item"
            icon={<Diversity3Icon />}
            onClick={() => navigate(`/${teamId}/members/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Участники"}
          </MenuItem>

          <MenuItem
            className="menu-item"
            icon={<Market />}
            onClick={() => navigate(`/${teamId}/market/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Магазин"}
          </MenuItem>

          <MenuItem
            className="menu-item"
            icon={<SettingsIcon />}
            onClick={() => navigate(`/${teamId}/settings/`)}
          >
            {isMenuOpen && windowWidth > breakpoint && "Настройки"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MenuBar;
