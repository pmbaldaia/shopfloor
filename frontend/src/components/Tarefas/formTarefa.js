import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formTarefa.module.css";
import { getUsers } from "../../axios/users";

const NewTarefa = (props, user) => {
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(user.accessToken);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user.accessToken]);

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
          <Col lg={7}>
            <span>
              Associar Operário
              <select>
                {users.map((user) => (
                  <option key={user.nome}>{user.nome}</option>
                ))}
              </select>
            </span>
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
