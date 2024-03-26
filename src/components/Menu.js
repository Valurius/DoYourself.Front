import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "../styles/componentStyles/Menu.css";
import GroupsIcon from "@mui/icons-material/Groups";
import ManIcon from "@mui/icons-material/Man";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Market from "@mui/icons-material/LocalGroceryStoreRounded";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const MenuBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen] = useState(true);

  // Создаем функцию для обновления ширины окна просмотра при изменении размера
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Добавляем обработчик события resize к window при монтировании компонента
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Определяем пороговое значение ширины окна просмотра, при котором компонент будет минимизирован
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
          <span className="span">
            {isMenuOpen
              ? windowWidth > breakpoint
                ? "Команда Гар"
                : null
              : null}
          </span>
          <Link to={`/1/myTasks/`} className="link">
            <MenuItem className="menu-item" icon={<ManIcon />}>
              {isMenuOpen
                ? windowWidth > breakpoint
                  ? "Мои задачи"
                  : null
                : null}
            </MenuItem>
          </Link>

          <Link to="/1/tasks/" className="link">
            <MenuItem className="menu-item" icon={<GroupsIcon />}>
              {isMenuOpen
                ? windowWidth > breakpoint
                  ? "Все Задачи"
                  : null
                : null}
            </MenuItem>
          </Link>

          <Link to="/1/statistics/" className="link">
            <MenuItem className="menu-item" icon={<QueryStatsIcon />}>
              {isMenuOpen
                ? windowWidth > breakpoint
                  ? "Статистика"
                  : null
                : null}
            </MenuItem>
          </Link>

          <Link to="/1/members/" className="link">
            <MenuItem className="menu-item" icon={<Diversity3Icon />}>
              {isMenuOpen
                ? windowWidth > breakpoint
                  ? "Участники"
                  : null
                : null}
            </MenuItem>
          </Link>

          <Link to="/1/market/" className="link">
            <MenuItem
              variant="contained"
              className="menu-item"
              icon={<Market />}
            >
              {isMenuOpen
                ? windowWidth > breakpoint
                  ? "Магазин"
                  : null
                : null}
            </MenuItem>
          </Link>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default MenuBar;
