import React, { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useSubmit,
  useLocation,
} from "react-router-dom";

import { getTokenDuration } from "../../util/auth";
import HeaderPage from "../../components/Header/header";
import SideBar from "../../components/SideBar/sidebar";
import "./layout.css";

function RootLayout() {
  //configuracao token
  const token = useLoaderData();
  const location = useLocation();
  const submit = useSubmit();
  const isDashboard = window.location.pathname === "/";

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <div className={isDashboard ? null : "sidebar"}>
        {location.pathname !== "/" && <SideBar />}
      </div>
      <div className={isDashboard ? "null" : "main-content"}>
        {location.pathname !== "/" && <HeaderPage />}
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
