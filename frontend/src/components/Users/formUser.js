import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formUser.module.css";
import { useSelector } from "react-redux";
import { getTarefas } from "../../axios/tarefas";

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
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetchTarefas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchTarefas() {
    try {
      const res = await getTarefas(user.access_token);
      const tarefas = res.data.tarefas;
      console.log(tarefas);
      setTarefas(tarefas);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  }

  const [selectedValues, setSelectedValues] = useState([]);
  const handleCheckboxClick = (event) => {
    const value = event.target.value;

    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Container fluid className={classes.Container}>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <h1 className={classes.titulosForm}>Novo Operário</h1>
            <X
              size={32}
              onClick={() => props.handleOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        </Row>
        <Row className={classes.primeiraLinha}>
          <Col lg={2}>
            <span className={classes.subtitulosForm}>Dados Pessoais</span>
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ paddingRight: "10px" }}>Nome:</label>
            <input placeholder="Nome"></input>
          </Col>
          <Col lg={5} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ paddingRight: "10px" }}>ID: </label>
            <input placeholder="Código funcionário" disabled></input>
          </Col>
          <p></p>
          <Col lg={2}>
            <span></span>{" "}
          </Col>
          <Col lg={8} style={{ display: "flex", alignItems: "center" }}>
            <label style={{ paddingRight: "10px" }}>Especialidade: </label>
            <div
              style={{
                display: "flex",
                flexDirection: "list",
              }}
            >
              {tarefas.map((tarefa) => (
                <label
                  key={tarefa.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "25px",
                  }}
                >
                  <input
                    type="checkbox"
                    value={tarefa.produto}
                    checked={selectedValues.includes(tarefa.produto)}
                    onClick={handleCheckboxClick}
                  />{" "}
                  {tarefa.produto}
                </label>
              ))}
            </div>
          </Col>
          <Col lg={2}>
            <select style={{ color: "#3D393999" }}>
              <option disabled selected value="">
                Tipo
              </option>
              <option value="operario">Operário</option>
              <option value="gestor">Gestor</option>
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
        <Button style={ButtonStyle}>Adicionar Operário</Button>
      </Container>
    </Modal>
  );
};

export default NewTarefa;
