import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const AdicionarOrdem = () => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  return (
    <>
      <Button
        style={ButtonStyle}
        onClick={() => {
          handleOpenModal();
          navigate(`/ordens/nova`);
        }}
      >
        Adicionar Ordem
      </Button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h1>Teste</h1>
        <p>Não quero saber se funciona ou não</p>
      </Modal>

      {/* <Button style={ButtonStyle} onClick={() => navigate(`/ordens/nova`)}>
        Adicionar Ordem
      </Button> */}

      {/*  <Button style={ButtonStyle} to="/ordens/nova">Adicionar Ordem</Button> */}
    </>
  );
};

export default AdicionarOrdem;
