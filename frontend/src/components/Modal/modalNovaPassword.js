import React, { useState } from "react";
import Modal from "react-modal";
import { X, Eye, EyeSlash } from "@phosphor-icons/react";
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

const ModalNovaPassword = ({ isOpen, closeModal }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = (field) => {
    if (field === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const notify = () => toast("Wow so easy!");

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
          <div style={{ position: "relative" }}>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="***********"
              style={{ width: "100%", marginBottom: "1em" }}
            />
            <span
              type="button"
              onClick={() => togglePassword("newPassword")}
              style={{
                position: "absolute",
                right: 10,
                top: 15,
                transform: "translateY(-50%)",
              }}
            >
              {showNewPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <label htmlFor="confirmPassword">Confirme a nova password:</label>
          <div style={{ position: "relative" }}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="***********"
              style={{ width: "100%", marginBottom: "1em" }}
            />
            <span
              type="button"
              onClick={() => togglePassword("confirmPassword")}
              style={{
                position: "absolute",
                right: 10,
                top: 15,
                transform: "translateY(-50%)",
              }}
            >
              {showConfirmPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>
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

export default ModalNovaPassword;
