import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formOrdem.module.css";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt";

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
  const [liberadoDate, setLiberadoDate] = useState(null);
  const [primeiroConsumoDate, setPrimeiroConsumoDate] = useState(null);
  const [ultimoConsumoDate, setUltimoConsumoDate] = useState(null);
  const [entradaTecidoDate, setEntradaTecidoDate] = useState(null);
  const [previstaAcessoriosDate, setPrevistaAcessoriosDate] = useState(null);
  const [aprovacaoModeloDate, setAprovacaoModeloDate] = useState(null);
  const [desejadaRemessaDate, setDesejadaRemessaDate] = useState(null);
  const [previstaProducaoDate, setPrevistaProducaoDate] = useState(null);

  const handleLiberadoDateChange = (date) => {
    setLiberadoDate(date);
  };

  const handlePrimeiroConsumoDateChange = (date) => {
    setPrimeiroConsumoDate(date);
  };

  const handleUltimoConsumoDateChange = (date) => {
    setUltimoConsumoDate(date);
  };

  const handleEntradaTecidoDateChange = (date) => {
    setEntradaTecidoDate(date);
  };
  const handlePrevistaAcessoriosDateChange = (date) => {
    setPrevistaAcessoriosDate(date);
  };
  const handleAprovacaoModeloDateChange = (date) => {
    setAprovacaoModeloDate(date);
  };
  const handleDesejadaRemessaDateChange = (date) => {
    setDesejadaRemessaDate(date);
  };
  const handlePrevistaProducaoDateChange = (date) => {
    setPrevistaProducaoDate(date);
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Container fluid className={classes.Container}>
        <Row>
          <Col className="d-flex align-items-center justify-content-between">
            <h1 className={classes.titulosForm}>Nova Ordem</h1>
            <X
              size={32}
              onClick={() => props.handleOpenModal(false)}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Row className={classes.primeiraLinha}>
            <Col>
              <span className={classes.subtitulosForm}>Produto</span>
            </Col>
            <Col>
              <input placeholder="Ordem de Produção"></input>
            </Col>
            <Col>
              <select>
                <option disabled selected value="">
                  Tipo
                </option>
                <option value="JP01">JP01</option>
                <option value="JP02">JP02</option>
              </select>
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

          <Row className={classes.segundaLinha}>
            <Col>
              <span className={classes.subtitulosForm}>Prazos</span>
            </Col>
            <Col>
              <DatePicker
                placeholderText="Liberado"
                selected={liberadoDate}
                onChange={handleLiberadoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="1º Consumo"
                selected={primeiroConsumoDate}
                onChange={handlePrimeiroConsumoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Data de Últ. consumo"
                selected={ultimoConsumoDate}
                onChange={handleUltimoConsumoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Dt Prevista Entrada Tecido"
                selected={entradaTecidoDate}
                onChange={handleEntradaTecidoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <DatePicker
                placeholderText="Últ. Entrada Pedido Compra"
                selected={entradaTecidoDate}
                onChange={handleEntradaTecidoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Data Prevista Acessórios"
                selected={previstaAcessoriosDate}
                onChange={handlePrevistaAcessoriosDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Data Aprovação Modelo"
                selected={aprovacaoModeloDate}
                onChange={handleAprovacaoModeloDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col>
              <DatePicker
                placeholderText="Data Desejada Remessa"
                selected={desejadaRemessaDate}
                onChange={handleDesejadaRemessaDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <p></p>
            <Col>
              <span></span>
            </Col>
            <Col>
              <DatePicker
                placeholderText="Data Prevista Produção"
                selected={previstaProducaoDate}
                onChange={handlePrevistaProducaoDateChange}
                locale={pt}
                dateFormat="dd/MM/yyyy"
              />
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
          <Row className={classes.terceiraLinha}>
            <Col lg={2}>
              <span className={classes.subtitulosForm}>Observações</span>
            </Col>
            <Col lg={10}>
              <input className={classes.inputObs}></input>
            </Col>
          </Row>
        </Row>
        <Button style={ButtonStyle}>Adicionar Ordem</Button>
      </Container>
    </Modal>
  );
};

export default NewOrdem;
