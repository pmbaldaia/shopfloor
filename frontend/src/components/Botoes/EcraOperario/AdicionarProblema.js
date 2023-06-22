import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

const AdicionarMaquina = () => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "5em",
    height: "5em",
    marginRight: "2em",
    float: "right",
    border: "none",
    outlineStyle: "none",
    outlineColor: "none",
    borderRadius: "50%",
    display: "inline-block",
  };
  return (
    <>
      <Link>
        <Button style={ButtonStyle}>
          <Plus size={28} />
        </Button>
      </Link>
    </>
  );
};

export default AdicionarMaquina;
