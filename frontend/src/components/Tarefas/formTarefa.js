import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formTarefa.module.css";
import { useSelector } from "react-redux";
import { getUsers } from "../../axios/users";
import { getOrdens } from "../../axios/ordens";

const NewTarefa = (props) => {
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
    outline: "none",
  };

  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [ordens, setOrdens] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchOrdens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchUsers() {
    try {
      const res = await getUsers(user.access_token);
      const users = res.data.users;
      console.log(users);
      setUsers(users);
    } catch (error) {
      console.error("Erro ao buscar os users:", error);
    }
  }

  async function fetchOrdens() {
    try {
      const res = await getOrdens(user.access_token);
      const ordens = res.data.ordens;
      console.log(ordens);
      setOrdens(ordens);
    } catch (error) {
      console.error("Erro ao buscar as ordens:", error);
    }
  }
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Container fluid className={classes.Container}>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <h1 className={classes.titulosForm}>Nova Tarefa</h1>
            <X
              size={32}
              onClick={() => props.handleOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
        <Row className={classes.primeiraLinha}>
          <Col lg={2}>
            <span className={classes.subtitulosForm}>Tarefa</span>
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ paddingRight: "10px" }}>Nome:</label>
            <input placeholder="Tarefa"></input>
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "12em" }}>Associar Operário:</label>
            <select style={{ color: "#3D393999" }}>
              <option disabled selected value="">
                Operários
              </option>
              {users.map((user) => (
                <option key={user.nome}>{user.nome}</option>
              ))}
            </select>
          </Col>
          <p></p>
          <Col lg={2}>
            <span></span>{" "}
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ paddingRight: "10px" }}>Produto:</label>
            <select style={{ color: "#3D393999" }}>
              <option disabled selected value="">
                Produto
              </option>
              {ordens.map((ordem) => (
                <option key={ordem.id}>{ordem.produto}</option>
              ))}
            </select>
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "12em" }}>Ordem Associada:</label>
            <select style={{ color: "#3D393999" }}>
              <option disabled selected value="">
                Ordens
              </option>
              {ordens.map((ordem) => (
                <option key={ordem.id}>{ordem.sap}</option>
              ))}
            </select>
          </Col>
        </Row>
        <hr
          style={{
            padding: "10px 0",
            marginBottom: "20px",
            border: "none",
            borderTop: "1px solid #3a5a40",
          }}
        />
        <Row className={classes.terceiraLinha}>
          <Col lg={2}>
            <span className={classes.subtitulosForm}>Observações</span>
          </Col>
          <Col lg={10}>
            <input className={classes.inputObs}></input>
          </Col>
        </Row>
        <Button style={ButtonStyle}>Adicionar Tarefa</Button>
      </Container>
    </Modal>
  );
};

export default NewTarefa;
