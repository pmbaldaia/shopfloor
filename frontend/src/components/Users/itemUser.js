import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Pencil, Trash, UserSwitch } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import { updateUserTipo } from "../../axios/users";
import classes from "./itemUser.module.css";
import ModalApagar from "../Modal/modalApagar";

function UserItem({ User, access_token }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const [sortUsers, setSortUsers] = useState([]);

  const handleAlterarTipo = async (userId) => {
    const updatedUsers = sortUsers.map((user) => {
      if (user.id === userId) {
        const novoTipo = user.tipo === "gestor" ? "operario" : "gestor";

        updateUserTipo(access_token, userId, novoTipo)
          .then(() => {
            console.log("Tipo do operário atualizado com sucesso.");
            user.tipo = novoTipo;
            setSortUsers([...sortUsers]);
          })
          .catch((error) => {
            console.error("Erro ao atualizar o tipo do operário:", error);
          });
      }
      return user;
    });

    setSortUsers(updatedUsers);
  };

  return (
    <div className="container">
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Card className={`${classes.card}`}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#a3b18a50",
            color: "#120309",
          }}
        >
          ID OPERÁRIO: {User.id}
        </Card.Header>
        <Card.Body>
          <div
            className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
          >
            <div className="row">
              <div className="col-3">USER ID</div>
              <div className="col-3">NOME</div>
              <div className="col-3">TIPO</div>
              <div className="col-3">AÇÕES</div>
            </div>
            <div className="row">
              <div className="col-3">{User.id}</div>
              <div className="col-3">{User.nome}</div>
              <div className="col-3">{User.tipo}</div>
              <div className="col-3">
                <span>
                  <Link to="/editar">
                    <Pencil size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} onClick={openModal}>
                    <Trash size={28} weight="light" />
                    <ModalApagar isOpen={modalIsOpen} closeModal={closeModal} />
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    style={{ color: "black" }}
                    onClick={() => handleAlterarTipo(User.id)}
                  >
                    <UserSwitch size={28} weight="light" />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserItem;
