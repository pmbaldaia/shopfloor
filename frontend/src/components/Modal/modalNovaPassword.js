import React from "react";
import Modal from "react-modal";
import { X } from "@phosphor-icons/react";
import { Row, Col } from "react-bootstrap";
import Prosseguir from "../Botoes/Prosseguir";
import Alterar from "../Botoes/Alterar";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const modalNovaPasswordStyle = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    alignItems: "center",
    width: "auto",
    height: "auto",
    borderRadius: "9px",
    outline: "none",
    border: "none",
    background: "#F5F5F5",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "3em",
    margin: 0,
  },
};

const notify = () => toast("Wow so easy !");
const ModalNovaPassoword = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalNovaPasswordStyle}
    >
      <Row>
        <Col
          lg={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "flex-end",
          }}
        >
          <X
            onClick={() => {
              closeModal();
              notify();
            }}
            style={{ cursor: "pointer", float: "right" }}
            size={32}
          />

          <ToastContainer />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1em" }}>
            Deseja alterar a sua password?
          </h2>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <label htmlFor="newPassword">Nova Password:</label>
          <input
            id="newPassword"
            placeholder="***********"
            style={{ width: "100%", marginBottom: "1em" }}
          ></input>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <label htmlFor="confirmPassword">Confirme a nova password:</label>
          <input
            id="confirmPassword"
            placeholder="***********"
            style={{ width: "100%", marginBottom: "1em" }}
          ></input>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            paddingTop: "1em",
            textAlign: "center",
            marginBottom: "1em",
          }}
        >
          <Prosseguir />
          <span style={{ margin: "0 1em" }}>ou</span>
          <Alterar />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalNovaPassoword;
