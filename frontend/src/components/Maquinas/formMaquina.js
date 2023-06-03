import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formMaquina.module.css";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt";

const NewMaquina = (props) => {
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
  const [dataAquisicao, setDataAquisicaoDate] = useState(null);
  const [UltimaManutencao, setUltimaManutencaoDate] = useState(null);
  const [ProximaManutencao, setProximaManutencaoDate] = useState(null);
  const handleDataAquisicao = (date) => {
    setDataAquisicaoDate(date);
  };
  const handleUltimaManutencao = (date) => {
    setUltimaManutencaoDate(date);
  };

  const handleProximaManutencao = (date) => {
    setProximaManutencaoDate(date);
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Container fluid className={classes.Container}>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <h1 className={classes.titulosForm}>Nova Máquina</h1>
            <X
              size={32}
              onClick={() => props.handleOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Row className={classes.primeiraLinha}>
            <Col lg={2}>
              <span className={classes.subtitulosForm}>Dados</span>
            </Col>
            <Col>
              <input placeholder="ID" disabled></input>
            </Col>
            <Col>
              <input placeholder="Nome"></input>
            </Col>
            <Col>
              <input placeholder="Fabricante"></input>
            </Col>
            <p></p>
            <Col lg={2}>
              <span></span>
            </Col>
            <Col>
              <DatePicker
                placeholderText="DataAquisição"
                selected={dataAquisicao}
                onChange={handleDataAquisicao}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <input placeholder="Tipo"></input>
            </Col>
            <Col>
              <input placeholder="Modelo"></input>
            </Col>
            <p></p>
            <Col lg={2}>
              <span></span>
            </Col>
            <Col lg={3}>
              <input placeholder="Estado"></input>
            </Col>
            <p></p>
          </Row>
          <hr
            style={{
              padding: "10px 0",
              marginBottom: "20px",
              border: "none",
              borderTop: "1px solid #3a5a40",
            }}
          />
          <Row className={classes.segundaLinha}>
            <Col lg={2}>
              <span className={classes.subtitulosForm}>Manutenção</span>
            </Col>
            <Col>
              <DatePicker
                placeholderText="Última Manutenção"
                selected={UltimaManutencao}
                onChange={handleUltimaManutencao}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Próxima Manutenção"
                selected={ProximaManutencao}
                onChange={handleProximaManutencao}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <p></p>
            <Col lg={2}>
              <span></span>
            </Col>
            <Col lg={4}>
              <input placeholder="Problemas a registar"></input>
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
        </Row>
        <Button style={ButtonStyle}>Adicionar Máquina</Button>
      </Container>
    </Modal>
  );
};

export default NewMaquina;
