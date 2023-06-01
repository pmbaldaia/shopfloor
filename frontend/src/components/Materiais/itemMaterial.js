import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import classes from "./itemMaterial.module.css";
import HeaderPage from "../Header/header";
import { Pencil, Trash } from "@phosphor-icons/react";
import ModalApagar from "../Modal/modalApagar";

function MaterialItem({ material }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Table
        bordered
        className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
      >
        <thead>
          <tr>
            <th>MATERIAL ID</th>
            <th>MATERIAL</th>
            <th>STOCK</th>
            <th>QUANTIDADE</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{material.id}</td>
            <td>{material.material}</td>
            <td>{material.stock}</td>
            <td>{material.quantidade}</td>
            <td>
              <Link style={{ color: "black" }} to={`/ordens/editar`}>
                <Pencil size={28} weight="light" />
              </Link>
              &nbsp; &nbsp;
              <Link style={{ color: "black" }} onClick={openModal}>
                <Trash size={28} weight="light" />
                <ModalApagar isOpen={modalIsOpen} closeModal={closeModal} />
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default MaterialItem;
