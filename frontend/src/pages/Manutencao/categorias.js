import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HeaderPage from "../../components/Header/header";
import { getCategorias } from "../../axios/categorias";
import { useSelector } from "react-redux";
import classes from "./manutencao.module.css";

function Manutencao() {
  const user = useSelector((state) => state.user);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchCategorias() {
    try {
      const res = await getCategorias(user.access_token);
      const categoriasData = res.data.categorias;
      console.log("Categorias recebidas:", categoriasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
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
          <h1>Manutenção - Categorias</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {categorias.map((categoria) => (
            <p key={categoria.id}>{categoria.categoria}</p>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default Manutencao;
