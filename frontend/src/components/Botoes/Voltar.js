import React from "react";
import Button from "react-bootstrap/Button";

const Voltar = (props) => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "10em",
    height: "3em",
    marginTop: "1em",
    marginRight: "2em",
    float: "right",
    border: "none",
    outlineStyle: "none",
    outlineColor: "none",
  };
  return (
    <>
      <Button style={ButtonStyle} onClick={props.onClick()}>
        Voltar
      </Button>
    </>
  );
};

export default Voltar;
