import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Pencil, Trash, UserSwitch, Users } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import { getUserById } from "../../axios/users";
import classes from "./itemUser.module.css";
import ModalApagar from "../Modal/modalApagar";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function UserItem({ User, access_token }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAlterarTipo = async (userId) => {
    try {
      const novoTipo = User.tipo === "gestor" ? "operario" : "gestor";

      await getUserById(access_token, userId)
        .then((response) => {
          const user = response.data;
          user.tipo = novoTipo;
          return getUserById.patch(`/users/${userId}`, user);
        })
        .then(() => {
          console.log("Tipo do operário atualizado com sucesso.");
          User.tipo = novoTipo;
        })
        .catch((error) => {
          console.error("Erro ao atualizar o tipo do operário:", error);
        });
    } catch (error) {
      console.error("Erro ao atualizar o tipo do operário:", error);
    }
  };

  return (
    <div className="container">
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <h2 style={{ fontSize: "28px", margin: "auto", padding: "10px" }}>
        Detalhes do Operário / Utilizador
      </h2>
      <p></p>
      <Tabs defaultActiveKey="home">
        <Tab
          eventKey="home"
          className={classes.TabContent}
          title={<span className={classes.tabColor}>Dados Pessoais</span>}
        >
          <Card className={`${classes.card}`}>
            <Card.Header style={{ backgroundColor: "#a3b18a50" }}>
              <Users size={28} weight="light" />
              <span
                style={{
                  display: "flex",
                  justifyContent: "end",
                  textAlign: "end",
                  float: "right",
                }}
              >
                <Link to="/editar" style={{ color: "black" }}>
                  <Pencil size={28} weight="light" alt="EDITAR" />
                </Link>
                &nbsp; &nbsp;
                <Link style={{ color: "black" }} onClick={openModal}>
                  <Trash size={28} weight="light" />
                </Link>
                <ModalApagar isOpen={modalIsOpen} closeModal={closeModal} />
              </span>
            </Card.Header>
            <Card.Body>
              <div
                className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
              >
                <div className="row">
                  <div className="col-4">NOME</div>
                  <div className="col-4">TIPO</div>
                  <div className="col-4">ESPECIALIDADE</div>
                </div>
                <div className="row">
                  <div className="col-4">{User.nome}</div>
                  <div className="col-4">
                    {User.tipo} &nbsp;
                    <Link
                      style={{ color: "black" }}
                      onClick={() => {
                        handleAlterarTipo(User.tipo);
                      }}
                    >
                      <UserSwitch size={22} weight="light" alt="ALTERAR TIPO" />
                    </Link>
                  </div>
                  <div className="col-4">{User.especialidade}</div>
                </div>
              </div>
              <div
                className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
              >
                <div className="row">
                  <div className="col-12">OBSERVAÇÕES</div>
                </div>
                <div className="row">
                  <div className="col-12">{User.observacoes}</div>
                </div>
              </div>
              <div
                className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
              >
                <div className="row">
                  <div className="col-4">Tarefas</div>
                </div>
                <div className="col-4">
                  {User.tarefas.length > 0 ? (
                    <ul>
                      {User.tarefas.map((tarefa, index) => (
                        <li key={index}>{tarefa}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>Não há tarefas disponíveis.</span>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default UserItem;
