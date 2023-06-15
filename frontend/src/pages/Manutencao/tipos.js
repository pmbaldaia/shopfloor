import React from "react";
import { Row, Col } from "react-bootstrap";
import HeaderPage from "../../components/Header/header";

function Manutencao() {
  return (
    <>
      <Row>
        <Col>
          <HeaderPage showCaretLeft={false} showSearchBar={true} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Manutenção - Tipos</h1>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
}

export default Manutencao;
