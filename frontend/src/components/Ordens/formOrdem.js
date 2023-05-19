import React from "react";

const NewOrdem = ({ isOpen, onRequestClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <h1>Teste</h1>
      <p>Não quero saber se funciona ou não</p>
      <button onClick={onRequestClose}>Fechar</button>
    </div>
  );
};

export default NewOrdem;
