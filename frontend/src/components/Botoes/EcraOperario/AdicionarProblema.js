import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const AdicionarMaquina = () => {
    const ButtonStyle = {
        backgroundColor: "#dad7cd",
        color: "#3a5a40",
        fontSize: "14px",
        fontWeight: "600",
        width: "16em",
        height: "3em",
        marginRight: "2em",
        float: "right",
        border: "none",
        outlineStyle: "none",
        outlineColor: "none",
    };
  return (
    <>
      <Link>
        <Button style={ButtonStyle}>
          Adicionar Problema
        </Button>
      </Link>
    </>
  );
};

export default AdicionarMaquina;