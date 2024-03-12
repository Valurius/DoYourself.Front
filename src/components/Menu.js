import { Sidebar, SubMenu, Menu, MenuItem } from "react-pro-sidebar";
import "../styles/componentStyles/Menu.css";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import { useEffect, useState } from "react";
const MenuBar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
  const breakpoint = 768;
  return (
    <div style={{ display: "flex", height: "100vh", width: "10vw" }}>
      <Sidebar
        className="sidebar"
        style={{
          background: "white",
          minWidth: windowWidth > breakpoint ? "220px" : "70px",
        }}
      >
        <Menu className="menu">
          <span className="span">
            {windowWidth > breakpoint ? "Команда Гар" : null}
          </span>
          <SubMenu
            label={windowWidth > breakpoint ? "Задачи" : null}
            icon={<BarChartRoundedIcon />}
          >
            <MenuItem className="menu-item" icon={<TimelineRoundedIcon />}>
              {windowWidth > breakpoint ? "Мои задачи" : null}
            </MenuItem>
            <MenuItem className="menu-item" icon={<BubbleChartRoundedIcon />}>
              {windowWidth > breakpoint ? "Все задачи" : null}
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<GridViewRoundedIcon />}>
            {windowWidth > breakpoint ? "Статистика" : null}
          </MenuItem>
          <MenuItem icon={<ReceiptRoundedIcon />}>
            {windowWidth > breakpoint ? "Участники" : null}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default MenuBar;
