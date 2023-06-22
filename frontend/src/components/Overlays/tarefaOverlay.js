import { OverlayTrigger } from "react-bootstrap";

function TarefasOverlayTarefas({ operario_associado, children }) {
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
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
          {operario_associado}
        </div>
      }
    >
      {children}
    </OverlayTrigger>
  );
}

export default TarefasOverlayTarefas;
