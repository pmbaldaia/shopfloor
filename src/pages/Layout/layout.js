import React, { useEffect/* , useState */ } from "react";
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
/* import { ThemeProvider } from "../../themeContext"; */

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

 /*  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }; */

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
          </div>{/* 
        </div>
      </ThemeProvider> */}
    </>
  );
}

export default RootLayout;
