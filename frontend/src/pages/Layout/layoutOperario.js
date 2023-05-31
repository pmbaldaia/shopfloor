import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./layoutOperario.module.css";

function LayoutOperario() {
  return (
    <div className={`${classes["content-container"]}`}>
      <Outlet />
    </div>
  );
}

export default LayoutOperario;
