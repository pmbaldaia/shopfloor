import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Alterar = () => {
  const ButtonStyle = {
    backgroundColor: "#3a5a40",
    color: "white",
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
        <Button style={ButtonStyle}>Alterar</Button>
      </Link>
    </>
  );
};

export default Alterar;
