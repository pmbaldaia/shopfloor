import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./breadcrumbs.module.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((pathname) => pathname !== "");

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ fontSize: "12px", margin: "auto" }}>
        <li className="breadcrumb-item">
          <Link to="/dashboard" className={classes.customLink}>
            Dashboard
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const linkText = pathname.charAt(0).toUpperCase() + pathname.slice(1);

          return (
            <li
              key={routePath}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
            >
              {isLast ? (
                linkText
              ) : (
                <Link to={routePath} className={classes.customLink}>
                  {linkText}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
