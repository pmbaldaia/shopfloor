/* import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import SideBar from "../../components/SideBar/sidebar";
import "./layout.css";

function RootLayout() {
  const location = useLocation();
  const isDashboard = window.location.pathname === "/";

  return (
    <>
      <div className={isDashboard ? null : "sidebar"}>
        {location.pathname !== "/" && <SideBar />}
      </div>
      <div className={isDashboard ? "null" : "main-content"}>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
 */

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/sidebar";
import "./layout.css";

function RootLayout() {
  const location = useLocation();
  const isDashboard = window.location.pathname === "/";

  return (
    <div className="layout-container">
      {!isDashboard && (
        <div className="sidebar">
          {location.pathname !== "/" && <SideBar />}
        </div>
      )}
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
