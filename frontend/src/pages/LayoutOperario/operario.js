import React from "react";
import classes from "./operario.module.css";
import { SignOut } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

function OperarioLayout() {
  const dispatch = useDispatch();
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>Layout Operário</h1>
      <span
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(userActions.logout());
        }}
        className={classes.logout}
      >
        {" "}
        <SignOut size={25} />
        Terminar Sessão
      </span>
    </div>
  );
}

export default OperarioLayout;
