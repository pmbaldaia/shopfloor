import React from "react";
import Modal from "react-modal";
import { FileX } from "@phosphor-icons/react";
import { Row, Col } from "react-bootstrap";
import Voltar from "../Botoes/Voltar";
import Eliminar from "../Botoes/Eliminar";

Modal.setAppElement("#root");

const modalApagarStyle = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "495px",
    height: "252px",
    borderRadius: "9px",
    outline: "none",
    border: "none",
    background: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    margin: 0,
  },
};

const ModalApagar = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalApagarStyle}>
      <Row>
        <Col>
          <span style={{ fontSize: "1.2rem" }}>
            De certeza que deseja eliminar esta ordem?
          </span>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "1em" }}>
          <FileX size={80} weight="light" />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "2em" }}>
          <Voltar onClick={closeModal} />
          <Eliminar />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalApagar;
