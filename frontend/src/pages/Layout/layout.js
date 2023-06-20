import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/sidebar";
import "./layout.css";

function RootLayout() {
  const location = useLocation();
  const isDashboard = window.location.pathname === "/";

  return (
    <div className="layout-container">
      {!isDashboard &&
        location.pathname !== "/" &&
        location.pathname !== "/operarios" &&
        location.pathname !== "/operarios/tarefas" && (
          <div className="sidebar">
            <SideBar />
          </div>
        )}
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
