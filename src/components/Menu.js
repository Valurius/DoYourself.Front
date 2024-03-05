import { Sidebar, SubMenu, Menu, MenuItem} from "react-pro-sidebar";
import "../styles/componentStyles/Menu.css";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
const MenuBar = () =>{
  return (
    <div style={{ display: "flex", height: "100vh" }}>
    <Sidebar className="sidebar">
      <Menu className="menu" >
      <SubMenu label="Задачи" icon={<BarChartRoundedIcon />}>
          <MenuItem className="menu-item" icon={<TimelineRoundedIcon />}> Мои задачи </MenuItem>
          <MenuItem className="menu-item" icon={<BubbleChartRoundedIcon />}> Все задачи</MenuItem>
        </SubMenu>
        <MenuItem icon={<GridViewRoundedIcon />}> Статистика </MenuItem>
        <MenuItem icon={<ReceiptRoundedIcon />}> Участники </MenuItem>
        
      
      </Menu>
    </Sidebar>
  </div>
  );
}
export default MenuBar;
