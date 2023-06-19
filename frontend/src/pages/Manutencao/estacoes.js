import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HeaderPage from "../../components/Header/header";
import { getEstacoes } from "../../axios/estacao";
import { useSelector } from "react-redux";
import classes from "./manutencao.module.css";

function Manutencao() {
  const user = useSelector((state) => state.user);
  const [estacoes, setEstacoes] = useState([]);

  useEffect(() => {
    fetchEstacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchEstacoes() {
    try {
      const res = await getEstacoes(user.access_token);
      const estacoesData = res.data.estacoes;
      console.log("Estacões recebidas:", estacoesData);
      setEstacoes(estacoesData);
    } catch (error) {
      console.error("Erro ao buscar as estações:", error);
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
          <h1>Manutenção - Estações</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {estacoes.map((estacao) => (
            <p key={estacao.id}>{estacao.estacao}</p>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Manutencao;
