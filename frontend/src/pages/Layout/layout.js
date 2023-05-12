import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import HeaderPage from "../../components/Header/header";
import SideBar from "../../components/SideBar/sidebar";
import "./layout.css";

function RootLayout() {
  const location = useLocation();
  const isDashboard = window.location.pathname === "/";

  return (
    <>
      {/* <ThemeProvider value={{ theme, toggleTheme }}>
        <div className={`root ${theme}`}> */}
      <div className={isDashboard ? null : "sidebar"}>
        {location.pathname !== "/" && <SideBar />}
      </div>
      <div className={isDashboard ? "null" : "main-content"}>
        {location.pathname !== "/" && <HeaderPage />}
        <Outlet />
      </div>
      {/* 
        </div>
      </ThemeProvider> */}
    </>
  );
}

export default RootLayout;
