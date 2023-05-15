import { OverlayTrigger } from "react-bootstrap";

function OrdensComponent({ descricao, children }) {
  return (
    <OverlayTrigger
      trigger="hover"
      placement="bottom"
      overlay={
        <div
          style={{
            position: "absolute",
            backgroundColor: "#DDE5DF",
            padding: "2px 10px",
            color: "#101820",
            borderRadius: 3,
          }}
        >
          {descricao}
        </div>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

export default OrdensComponent;
