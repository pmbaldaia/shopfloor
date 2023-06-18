import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HeaderPage from "../../components/Header/header";
import { getTipos } from "../../axios/tipos";
import { useSelector } from "react-redux";
import classes from "./manutencao.module.css";

function Manutencao() {
  const user = useSelector((state) => state.user);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    fetchTipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchTipos() {
    try {
      const res = await getTipos(user.access_token);
      const tiposData = res.data.tipos;
      console.log("Tipos recebidas:", tiposData);
      setTipos(tiposData);
    } catch (error) {
      console.error("Erro ao buscar as topos:", error);
    }
  }

  return (
    <div className={classes.headPadding}>
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
        <Col>
          {tipos.map((tipo) => (
            <p key={tipo.id}>{tipo.tipo}</p>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Manutencao;
