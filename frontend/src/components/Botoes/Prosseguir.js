import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Prosseguir = () => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
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
       <Link to="/dashboard">
        <Button style={ButtonStyle}>Prosseguir</Button>
      </Link>
    </>
  );
};

export default Prosseguir;
