import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import NewMaquina from "../Maquinas/formMaquina";

const AdicionarMaquina = () => {
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <Link>
        <Button
          style={ButtonStyle}
          onClick={() => {
            handleOpenModal();
            navigate(`/maquinas/nova`);
          }}
        >
          Adicionar Máquina
        </Button>
        {isModalOpen && (
          <NewMaquina
            isModalOpen={isModalOpen}
            handleOpenModal={handleCloseModal}
          />
        )}
      </Link>
    </>
  );
};

export default AdicionarMaquina;
