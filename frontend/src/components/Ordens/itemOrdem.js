import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Pencil, Trash, DownloadSimple } from "@phosphor-icons/react";
import classes from "./itemOrdem.module.css";
import { Container, Row, Col } from "react-bootstrap";
import HeaderPage from "../Header/header";
import { Tabs, Tab } from "react-bootstrap";

function OrdemItem({ ordem }) {
  const backgroundColor =
    ordem.estado === "Em Atraso"
      ? "#F58283"
      : ordem.estado === "Concluído"
      ? "#70CC7A"
      : "#5FA4D9";

  /* const borderStyle =
    ordem.estado === "Em Atraso" || ordem.estado === "Concluído"
      ? ""
      : "2px solid #a3b18a"; */

  const color =
    ordem.estado === "Em Atraso" || "Em Progresso" ? "white" : "black";

  useEffect(() => {
    const elemento = document.getElementById("styleOrdemEstado");
    elemento.style.backgroundColor = backgroundColor;
    /* elemento.style.border = borderStyle; */
    elemento.style.color = color;
  }, [backgroundColor /* borderStyle */, , color]);

  function startDeleteHandler() {
    swal({
      title: "Tem a certeza que quer apagar?",
      text: "Uma vez apagado, não poderá recuperá-lo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((Delete) => {
      if (Delete) {
        submit({ method: "delete" });
        swal("Ordem eliminada com sucesso", {
          icon: "success",
        });
      } else {
        swal("Ordem não apagada");
      }
    });
  }

  const submit = () => {};

  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <p>{}</p>
      <div className={classes.headerItemOrdem}>
        <h2>
          Ordem de Produção: {ordem.id}{" "}
          <Link /* to="editar" */>
            <Pencil size={25} weight="light" />
          </Link>
          &nbsp;
          <Link onClick={startDeleteHandler}>
            <Trash size={25} weight="light" />
          </Link>
          &nbsp;
          <Link>
            <DownloadSimple size={25} weight="light" />
          </Link>
        </h2>
        <h5 className={classes.barPrioridadeEstado}>
          Prioridade: {ordem.prioridade}
        </h5>
        <h5
          id="styleOrdemEstado"
          className={`${classes.barPrioridadeEstado} ${classes.barEstado}`}
        >
          {ordem.estado}
        </h5>
      </div>
      <p>{}</p>
      <ul className={classes.timeline}>
        <li className={classes.timelineItem}>
          <div className={classes.timelineContent}>
            <h5>Data De Emissão</h5>
            <p>{ordem.primeiro_consumo}</p>
          </div>
          <hr className={classes.timelineLine}></hr>
          <div className={classes.timelineCircle}></div>
        </li>
        <li className={classes.timelineItem}>
          <div className={classes.timelineContent}>
            <h5>Liberado</h5>
            <p>{ordem.liberado}</p>
          </div>
          <div className={classes.timelineCircle}></div>
        </li>
        <li className={classes.timelineItem}>
          <div className={classes.timelineContent}>
            <h5>1º Consumo</h5>
            <p>{ordem.primeiro_consumo}</p>
          </div>
          <div className={classes.timelineCircleDisabled}></div>
        </li>
        <li className={classes.timelineItem}>
          <div className={classes.timelineContent}>
            <h5>Últ. Consumo</h5>
            <p>{ordem.ultimo_consumo}</p>
          </div>
          <div className={classes.timelineCircleDisabled}></div>
        </li>
        <li className={classes.timelineItem}>
          <div className={classes.timelineContent}>
            <h5>Data desejada da Remessa</h5>
            <p>{ordem.data_desejada_remessa}</p>
          </div>
          <div className={classes.timelineCircleDisabled}></div>
        </li>
      </ul>
      <Tabs defaultActiveKey="home" className={`${classes.tabMargin} fill`}>
        <Tab
          eventKey="home"
          title={<span className={classes.tabColor}>Produto</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Tipo</Col>
                  <Col className={classes.columnInfo}>{ordem.tipo}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>SAP</Col>
                  <Col className={classes.columnInfo}>{ordem.sap}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Txt Breve Material</Col>
                  <Col className={classes.columnInfo}>
                    {ordem.txt_breve_material}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Ordem de venda</Col>
                  <Col className={classes.columnInfo}>{ordem.ordem_venda}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Estação</Col>
                  <Col className={classes.columnInfo}>{ordem.estacao}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Nome Cliente</Col>
                  <Col className={classes.columnInfo}>{ordem.nome_cliente}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Quantidade</Col>
                  <Col className={classes.columnInfo}>{ordem.quantidade}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Quantidade Fornecida</Col>
                  <Col className={classes.columnInfo}>
                    {ordem.quantidade_fornecida}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Quantidade Expedida </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.quantidade_expedida}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Nome Confeção </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.nome_confecao}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Liberado </Col>
                  <Col className={classes.columnInfo}>{ordem.liberado}</Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="prazos"
          title={<span className={classes.tabColor}>Prazos</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>1º Consumo </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.primeiro_consumo}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Último Consumo </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.ultimo_consumo}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>
                    Dt Prevista Ent Tecido{" "}
                  </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.data_prevista_entrada_tecido}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>
                    Ult Ent Pedido Compra{" "}
                  </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.ultima_entrada_pedido_compra}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>
                    Dt Prevista Acessórios{" "}
                  </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.data_prevista_acessorios}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Dt Aprovação Modelo </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.data_aprovacao_modelo}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>Dt Desejada Remessa </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.data_desejada_remessa}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className={classes.spacing}>
                  <Col className={classes.columnName}>
                    Dt Prevista Produção{" "}
                  </Col>
                  <Col className={classes.columnInfo}>
                    {ordem.data_prevista_producao}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="observacoes"
          title={<span className={classes.tabColor}>Observações</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={12}>
                <Row className={classes.spacingBottom}>
                  <Col md={2} className={classes.columnNameObservacao}>
                    Observações
                  </Col>
                  <Col md={10} className={classes.columnInfoObservacao}>
                    {ordem.observacao}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </>
  );
}

export default OrdemItem;
