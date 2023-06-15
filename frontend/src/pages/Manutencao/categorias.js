import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import HeaderPage from "../../components/Header/header";
import { getCategorias } from "../../axios/categorias";
import { useSelector } from "react-redux";

function Manutencao() {
  const user = useSelector((state) => state.user);
  const [/* categorias, */ setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchCategorias() {
    try {
      const res = await getCategorias(user.access_token);
      const categoriasData = res.data.categorias;
      console.log(categoriasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  return (
    <>
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
        <Col></Col>
      </Row>
    </>
  );
}

export default Manutencao;
