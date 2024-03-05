import React, { useState } from "react";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../styles/componentStyles/Menu.css";
import MyText from "./myUi/MyText/MyText";
const MenuBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <button onClick={toggleCollapsed}>Переключить меню</button>
      <Menu
        className={`menu ${collapsed ? "collapsed" : ""}`}
        collapsed={collapsed}
      >
        <MenuItem
          className="menu-item"
          icon={
            <svg
              className="svg"
              width="32"
              height="32"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="5%" stop-color="#92bfb1" />
                  <stop offset="95%" stop-color="#55a6ca" />
                </linearGradient>
              </defs>
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          }
        >
          <MyText>Home</MyText>
        </MenuItem>
        <SubMenu
          className="menu-item"
          label={<MyText>Products</MyText>}
          icon={
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="5%" stop-color="#92bfb1" />
                  <stop offset="95%" stop-color="#55a6ca" />
                </linearGradient>
              </defs>
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          }
        >
          <Menu className="sub-menu">
            <MenuItem className="sub-menu-item">Product 1</MenuItem>
            <MenuItem className="sub-menu-item">Product 2</MenuItem>
            <MenuItem className="sub-menu-item">Product 3</MenuItem>
          </Menu>
        </SubMenu>
        <SubMenu
          className="menu-item"
          label={<MyText>Settings</MyText>}
          icon={
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="5%" stop-color="#92bfb1" />
                  <stop offset="95%" stop-color="#55a6ca" />
                </linearGradient>
              </defs>
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          }
        >
          <Menu className="sub-menu">
            <MenuItem className="sub-menu-item">Profile</MenuItem>
            <MenuItem className="sub-menu-item">Security</MenuItem>
            <MenuItem className="sub-menu-item">Notifications</MenuItem>
          </Menu>
        </SubMenu>
        <MenuItem
          className="menu-item"
          icon={
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient id="MyGradient">
                  <stop offset="5%" stop-color="#92bfb1" />
                  <stop offset="95%" stop-color="#55a6ca" />
                </linearGradient>
              </defs>
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
            </svg>
          }
        >
          <MyText>Logout</MyText>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default MenuBar;
