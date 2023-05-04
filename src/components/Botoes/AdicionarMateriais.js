import React from "react";
import Button from "react-bootstrap/Button";

class AdicionarMateriais extends React.Component {
  render() {
    const ButtonStyle = {
      backgroundColor: "#e6e4de",
      color: "#3a5a40",
      fontSize: "14px",
      fontWeight: "600",
      width: "16em",
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
        <Button style={ButtonStyle}>Adicionar Material</Button>
      </>
    );
  }
}

export default AdicionarMateriais;
