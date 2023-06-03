import React /* , { useState } */ from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Eliminar = () => {
  const ButtonStyle = {
    backgroundColor: "transparent",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "13em",
    height: "3em",
    border: "2px solid #A3B18A",
    outlineStyle: "none",
    outlineColor: "none",
    justifyContent: "center",
  };

  return (
    <>
      <Link>
        <Button style={ButtonStyle}>Eliminar</Button>
      </Link>
    </>
  );
};

export default Eliminar;
