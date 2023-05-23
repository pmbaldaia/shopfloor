import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Pencil, Trash, DownloadSimple } from "@phosphor-icons/react";
import "./itemOrdem.css";
import { Container, Row, Col } from "react-bootstrap";
import HeaderPage from "../Header/header";
//para teste de abas
import { Tabs, Tab } from "react-bootstrap"; /* 
import Accordion from "react-bootstrap/Accordion"; */

function OrdemItem({ ordem }) {
  const backgroundColor =
    ordem.estado === "Em Atraso"
      ? "#F58283"
      : ordem.estado === "Concluído"
      ? "#70CC7A"
      : "#FFF";

  const borderStyle =
    ordem.estado === "Em Atraso" || ordem.estado === "Concluído"
      ? ""
      : "2px solid #a3b18a";

  const color = ordem.estado === "Em Atraso" ? "white" : "black";

  useEffect(() => {
    const elemento = document.getElementById("styleOrdemEstado");
    elemento.style.backgroundColor = backgroundColor;
    elemento.style.border = borderStyle;
    elemento.style.color = color;
  }, [backgroundColor, borderStyle, color]);

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
      <div className="headerItemOrdem">
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
        <h5 className="barPrioridadeEstado">Prioridade: {ordem.prioridade}</h5>
        <h5 id="styleOrdemEstado" className="barPrioridadeEstado barEstado">
          {ordem.estado}
        </h5>
      </div>
      <p>{}</p>
      <ul className="timeline">
        <li className="timeline-item">
          <div className="timeline-content">
            <h5>Data De Emissão</h5>
            <p>{ordem.primeiro_consumo}</p>
          </div>
          {/*  <hr className="timeline-line"></hr> */}
          <div className="timeline-circle"></div>
        </li>
        <li className="timeline-item">
          <div className="timeline-content">
            <h5>Liberado</h5>
            <p>{ordem.liberado}</p>
          </div>
          <div className="timeline-circle"></div>
        </li>
        <li className="timeline-item">
          <div className="timeline-content">
            <h5>1º Consumo</h5>
            <p>{ordem.primeiro_consumo}</p>
          </div>
          <div className="timeline-circleDisabled"></div>
        </li>
        <li className="timeline-item">
          <div className="timeline-content">
            <h5>Últ. Consumo</h5>
            <p>{ordem.ultimo_consumo}</p>
          </div>
          <div className="timeline-circleDisabled"></div>
        </li>
        <li className="timeline-item">
          <div className="timeline-content">
            <h5>Data desejada da Remessa</h5>
            <p>{ordem.data_desejada_remessa}</p>
          </div>
          <div className="timeline-circleDisabled"></div>
        </li>
      </ul>
      <Tabs defaultActiveKey="home" className="tabMargin fill">
        <Tab eventKey="home" title={<span className="tabColor">Produto</span>}>
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Tipo</Col>
                  <Col className="columnInfo">{ordem.tipo}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">SAP</Col>
                  <Col className="columnInfo">{ordem.sap}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Txt Breve Material</Col>
                  <Col className="columnInfo">{ordem.txt_breve_material}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Ordem de venda</Col>
                  <Col className="columnInfo">{ordem.ordem_venda}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Estação</Col>
                  <Col className="columnInfo">{ordem.estacao}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Nome Cliente</Col>
                  <Col className="columnInfo">{ordem.nome_cliente}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Quantidade</Col>
                  <Col className="columnInfo">{ordem.quantidade}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Quantidade Fornecida</Col>
                  <Col className="columnInfo">{ordem.quantidade_fornecida}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Quantidade Expedida </Col>
                  <Col className="columnInfo">{ordem.quantidade_expedida}</Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Nome Confeção </Col>
                  <Col className="columnInfo">{ordem.nome_confecao}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Liberado </Col>
                  <Col className="columnInfo">{ordem.liberado}</Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="prazos" title={<span className="tabColor">Prazos</span>}>
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">1º Consumo </Col>
                  <Col className="columnInfo">{ordem.primeiro_consumo}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Último Consumo </Col>
                  <Col className="columnInfo">{ordem.ultimo_consumo}</Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Dt Prevista Ent Tecido </Col>
                  <Col className="columnInfo">
                    {ordem.data_prevista_entrada_tecido}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Ult Ent Pedido Compra </Col>
                  <Col className="columnInfo">
                    {ordem.ultima_entrada_pedido_compra}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Dt Prevista Acessórios </Col>
                  <Col className="columnInfo">
                    {ordem.data_prevista_acessorios}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Dt Aprovação Modelo </Col>
                  <Col className="columnInfo">
                    {ordem.data_aprovacao_modelo}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Dt Desejada Remessa </Col>
                  <Col className="columnInfo">
                    {ordem.data_desejada_remessa}
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row className="spacing">
                  <Col className="columnName">Dt Prevista Produção </Col>
                  <Col className="columnInfo">
                    {ordem.data_prevista_producao}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab
          eventKey="observacoes"
          title={<span className="tabColor">Observações</span>}
        >
          <Container style={{ paddingTop: "1.5em" }}>
            <Row>
              <Col md={12}>
                <Row className="spacingBottom">
                  <Col md={2} className="columnNameObservacao">
                    Observações
                  </Col>
                  <Col md={10} className="columnInfoObservacao">
                    {ordem.observacao}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
      {/*   <Accordion defaultActiveKey={["0"]} alwaysOpen className="tabMargin fill">
        <Accordion.Item eventKey="0" className="custom-accordion-item">
          <Accordion.Header>Produto</Accordion.Header>
          <Accordion.Body>
            <Container style={{ paddingTop: "1.5em" }}>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Tipo</Col>
                    <Col className="columnInfo">{ordem.tipo}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">SAP</Col>
                    <Col className="columnInfo">{ordem.sap}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Txt Breve Material</Col>
                    <Col className="columnInfo">{ordem.txt_breve_material}</Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Ordem de venda</Col>
                    <Col className="columnInfo">{ordem.ordem_venda}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Estação</Col>
                    <Col className="columnInfo">{ordem.estacao}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Nome Cliente</Col>
                    <Col className="columnInfo">{ordem.nome_cliente}</Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Quantidade</Col>
                    <Col className="columnInfo">{ordem.quantidade}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Quantidade Fornecida</Col>
                    <Col className="columnInfo">
                      {ordem.quantidade_fornecida}
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Quantidade Expedida </Col>
                    <Col className="columnInfo">
                      {ordem.quantidade_expedida}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Nome Confeção </Col>
                    <Col className="columnInfo">{ordem.nome_confecao}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Liberado </Col>
                    <Col className="columnInfo">{ordem.liberado}</Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="custom-accordion-item">
          <Accordion.Header>Prazos</Accordion.Header>
          <Accordion.Body>
            <Container style={{ paddingTop: "1.5em" }}>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">1º Consumo </Col>
                    <Col className="columnInfo">{ordem.primeiro_consumo}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Último Consumo </Col>
                    <Col className="columnInfo">{ordem.ultimo_consumo}</Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Dt Prevista Ent Tecido </Col>
                    <Col className="columnInfo">
                      {ordem.data_prevista_entrada_tecido}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Ult Ent Pedido Compra </Col>
                    <Col className="columnInfo">
                      {ordem.ultima_entrada_pedido_compra}
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Dt Prevista Acessórios </Col>
                    <Col className="columnInfo">
                      {ordem.data_prevista_acessorios}
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Dt Aprovação Modelo </Col>
                    <Col className="columnInfo">
                      {ordem.data_aprovacao_modelo}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Dt Desejada Remessa </Col>
                    <Col className="columnInfo">
                      {ordem.data_desejada_remessa}
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <Row className="spacing">
                    <Col className="columnName">Dt Prevista Produção </Col>
                    <Col className="columnInfo">
                      {ordem.data_prevista_producao}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="custom-accordion-item">
          <Accordion.Header>Observações</Accordion.Header>
          <Accordion.Body>
            {" "}
            <Container style={{ paddingTop: "1.5em" }}>
              <Row>
                <Col md={12}>
                  <Row className="spacingBottom">
                    <Col md={2} className="columnNameObservacao">
                      Observações
                    </Col>
                    <Col md={10} className="columnInfoObservacao">
                      {ordem.observacao}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <Container style={{ paddingTop: "1.5em" }}>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Tipo</Col>
              <Col className="columnInfo">{ordem.tipo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">SAP</Col>
              <Col className="columnInfo">{ordem.sap}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Txt Breve Material</Col>
              <Col className="columnInfo">{ordem.txt_breve_material}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Ordem de venda</Col>
              <Col className="columnInfo">{ordem.ordem_venda}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Estação</Col>
              <Col className="columnInfo">{ordem.estacao}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Nome Cliente</Col>
              <Col className="columnInfo">{ordem.nome_cliente}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Quantidade</Col>
              <Col className="columnInfo">{ordem.quantidade}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Quantidade Fornecida</Col>
              <Col className="columnInfo">{ordem.quantidade_fornecida}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Quantidade Expedida </Col>
              <Col className="columnInfo">{ordem.quantidade_expedida}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Nome Confeção </Col>
              <Col className="columnInfo">{ordem.nome_confecao}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Liberado </Col>
              <Col className="columnInfo">{ordem.liberado}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Nome Tecido </Col>
              <Col className="columnInfo">{ordem.nome_tecido}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">1º Consumo </Col>
              <Col className="columnInfo">{ordem.primeiro_consumo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Último Consumo </Col>
              <Col className="columnInfo">{ordem.ultimo_consumo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Dt Prevista Ent Tecido </Col>
              <Col className="columnInfo">
                {ordem.data_prevista_entrada_tecido}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Ult Ent Pedido Compra </Col>
              <Col className="columnInfo">
                {ordem.ultima_entrada_pedido_compra}
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Data Prevista Acessórios </Col>
              <Col className="columnInfo">{ordem.data_prevista_acessorios}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Data Aprovação Modelo </Col>
              <Col className="columnInfo">{ordem.data_aprovacao_modelo}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Data Desejada Remessa </Col>
              <Col className="columnInfo">{ordem.data_desejada_remessa}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row className="spacing">
              <Col className="columnName">Data Prevista Produção </Col>
              <Col className="columnInfo">{ordem.data_prevista_producao}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Row className="spacingBottom">
              <Col md={2} className="columnNameObservacao">
                Observações
              </Col>
              <Col md={10} className="columnInfoObservacao">
                {ordem.observacao}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default OrdemItem;
