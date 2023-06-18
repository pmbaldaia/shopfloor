import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash, DownloadSimple } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./itemMaquina.module.css";
import { Tabs, Tab } from "react-bootstrap";
import ModalApagar from "../Modal/modalApagar";

function MaquinaItem({ maquina }) {
  /* const submit = () => {}; */

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
      <div className={classes.headerItemMaquina}>
        <h2>
          Detalhe da Máquina: {maquina.id}{" "}
          <Link /* to="editar" */>
            <Pencil size={25} weight="light" />
          </Link>
          &nbsp;
          <Link style={{ color: "black" }} onClick={openModal}>
            <Trash size={28} weight="light" />
          </Link>
          <ModalApagar isOpen={modalIsOpen} closeModal={closeModal} />
          &nbsp;
          <Link>
            <DownloadSimple size={25} weight="light" />
          </Link>
        </h2>
      </div>

      <Tabs defaultActiveKey="home" className={`${classes.tabMargin} fill`}>
        <Tab
          eventKey="home"
          title={<span className={classes.tabColor}>Dados</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>ID MÁQUINA</Col>
                  <Col className={classes.columnInfo}>{maquina.id}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>NOME</Col>
                  <Col className={classes.columnInfo}>{maquina.nome}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>FABRICANTE</Col>
                  <Col className={classes.columnInfo}>{maquina.fabricante}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>DATA AQUISIÇÃO</Col>
                  <Col className={classes.columnInfo}>
                    {maquina.data_aquisicao}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>TIPO</Col>
                  <Col className={classes.columnInfo}>{maquina.tipo}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>MODELO</Col>
                  <Col className={classes.columnInfo}>{maquina.modelo}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>ESTADO</Col>
                  <Col className={classes.columnInfo}>{maquina.estado}</Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="manutencao"
          title={<span className={classes.tabColor}>Manutenção</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={6}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>ÚLTIMA MANUTENÇÃO</Col>
                  <Col className={classes.columnInfo}>
                    {maquina.ultima_manutencao}
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>PRÓXIMA MANUTENÇÃO </Col>
                  <Col className={classes.columnInfo}>
                    {maquina.proxima_manutencao}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName} md={3}>
                    PROBLEMAS REGISTADOS{" "}
                  </Col>
                  <Col className={classes.columnInfo}>
                    {maquina.problemas_manutencao}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="imagem"
          title={<span className={classes.tabColor}>Imagem</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              {" "}
              <img
                className={classes.columnInfo}
                src={maquina.imagem}
                alt={maquina.nome}
                style={{
                  width: "30em",
                  height: "auto",
                  padding: "2em",
                  justifyContent: "center",
                  display: "flex",
                  zIndex: "0",
                }}
              />
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}

export default MaquinaItem;
