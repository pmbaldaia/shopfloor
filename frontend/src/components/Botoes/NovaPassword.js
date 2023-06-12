import React, { useState } from "react";
import ModalNovaPassword from "../Modal/modalNovaPassword";

const BotaoModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>NovaPassword</button>
      {modalOpen && (
        <ModalNovaPassword isOpen={modalOpen} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default BotaoModal;
