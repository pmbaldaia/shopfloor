import React from "react";
import Modal from "react-modal";
import { FileX } from "@phosphor-icons/react";
import { Row, Col } from "react-bootstrap";
import Eliminar from "../Botoes/Eliminar";
import Button from "react-bootstrap/Button";

Modal.setAppElement("#root");

const ButtonStyle = {
  backgroundColor: "#dad7cd",
  color: "#3a5a40",
  fontSize: "14px",
  fontWeight: "600",
  width: "13em",
  height: "3em",
  border: "none",
  outline: "none",
  justifyContent: "center",
  marginRight: "4em",
};

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
  const handleVoltar = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalApagarStyle}>
      <Row>
        <Col>
          <span style={{ fontSize: "1.2rem" }}>
            Tem certeza que deseja eliminar esta ordem?
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
          <Button onClick={handleVoltar} style={ButtonStyle}>
            Voltar
          </Button>
          <Eliminar />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalApagar;
