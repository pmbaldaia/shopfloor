import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Voltar = ({ closeModal }) => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "13em",
    height: "3em",
    border: "none",
    outlineStyle: "none",
    outlineColor: "none",
    justifyContent: "center",
    marginRight: "4em",
  };

  return (
    <Button style={ButtonStyle} onClick={closeModal}>
      Voltar
    </Button>
  );
};

export default Voltar;
