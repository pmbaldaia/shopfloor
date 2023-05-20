import React from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import "./formOrdem.css";
import Select from "react-select";

const NewOrdem = (props) => {
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
  const tiposOrdem = [
    { value: "JP01", label: "JP01" },
    { value: "JP02", label: "JP02" },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #a3b18a",
      borderRadius: "7px",
    }),
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Container /* fluid */>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <h1 className="titulosForm">Nova Ordem</h1>
            <X
              size={32}
              onClick={() => props.handleOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Row className="primeiraLinha">
            <Col>
              <span className="subtitulosForm">Produto</span>
            </Col>
            <Col>
              <input placeholder="Ordem de Produção"></input>
            </Col>
            <Col>
              <Select styles={customStyles} options={tiposOrdem} />
            </Col>
            <Col>
              <input placeholder="SAP"></input>
            </Col>
            <Col>
              <input placeholder="Txt Breve Material"></input>
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <input placeholder="Ordem de Venda"></input>
            </Col>
            <Col>
              <input placeholder="Estação"></input>
            </Col>
            <Col>
              <input placeholder="Nome do Cliente"></input>
            </Col>
            <Col>
              <input placeholder="Qtd Ordem"></input>
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <input placeholder="Qtd Forn."></input>
            </Col>
            <Col>
              <input placeholder="Qtd Exp."></input>
            </Col>
            <Col>
              <input placeholder="Nome Confeção"></input>
            </Col>
            <Col>
              <input placeholder="Nome Tecido"></input>
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

          <Row className="segundaLinha">
            <Col>
              <span className="subtitulosForm">Produto</span>
            </Col>
            <Col>
              <input placeholder="Liberado"></input>
            </Col>
            <Col>
              <input placeholder="1º Consumo"></input>
            </Col>
            <Col>
              <input placeholder="Data de Últ. consumo"></input>
            </Col>
            <Col>
              <input placeholder="Data Prevista Entrada Tecido"></input>
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <input placeholder="Últ. Entrada Pedido Compra"></input>
            </Col>
            <Col>
              <input placeholder="Data Prevista Acessórios"></input>
            </Col>
            <Col>
              <input placeholder="Data Aprovação Modelo"></input>
            </Col>
            <Col>
              <input placeholder="Data Desejada Remessa"></input>
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <input placeholder="Data Prevista Produção"></input>
            </Col>
            <Col>
              <span></span>
            </Col>
            <Col>
              <span></span>
            </Col>
            <Col>
              <span></span>
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
          <Row className="terceiraLinha">
            <Col lg={2}>
              <span className="subtitulosForm">Observações</span>
            </Col>
            <Col lg={10}>
              <input className="inputObs"></input>
            </Col>
          </Row>
        </Row>
        <Button style={ButtonStyle}>Adicionar Ordem</Button>
      </Container>
    </Modal>
  );
};

export default NewOrdem;
