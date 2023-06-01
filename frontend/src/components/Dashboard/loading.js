import React from "react";
import classes from "./loading.module.css";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className={`${classes["loading-spinner"]}`}></div>
    </div>
  );
};

export default Loading;
