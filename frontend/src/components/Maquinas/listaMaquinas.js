import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdicionarMaquina from "../Botoes/AdicionarMaquinas";
import classes from "./listaMaquinas.module.css";
import { ArrowClockwise, MagnifyingGlass } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import { useNavigate } from "react-router-dom";

function MaquinasList({ maquinas }) {
  const [sortMaquinas, setSortMaquinas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredMaquinas = maquinas.filter(
      (maquina) =>
        maquina.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maquina.material.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortMaquinas(filteredMaquinas);
  }, [maquinas, searchQuery]);

  function __refresh() {
    window.location.reload(false);
  }

  const navigate = useNavigate();

  return (
    <div>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <h1>Máquinas</h1>
      <AdicionarMaquina />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className={classes.iconRefresh}
      />
      <div className={classes.filterBarMaquinas}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${classes.filterBarMquinaItem} ${classes.searchBarMaquinas}`}
          placeholder="Procurar"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>

      <p>{}</p>

      <Container fluid>
        <Row>
          {sortMaquinas.map((maquina) => (
            <Col md={6} key={maquina.id}>
              <Row className={classes.spacingMaquinas}>
                <div className={`card ${classes.card} flex-row`}>
                  <img
                    className={`${classes.imagemMaquina} card-img-left`}
                    src={maquina.imagem}
                    alt={maquina.nome}
                  />
                  <div className="card-body">
                    <div style={{ display: "flex" }}>
                      <h4 className={classes.titleCard}>{maquina.nome}</h4>
                      <p
                        className={classes.textCard}
                        style={{ marginLeft: "auto", marginTop: "auto" }}
                      >
                        Tipo:{" "}
                        <span className={classes.textCardInfo}>
                          {maquina.tipo}
                        </span>
                      </p>
                    </div>
                    <span className={classes.textCard}>
                      Última Manutenção:{" "}
                      <span className={classes.textCardInfo}>
                        {maquina.ultima_manutencao}
                      </span>
                    </span>
                    <br></br>
                    <p className={classes.textCard}>
                      Próxima Manutenção:{" "}
                      <span className={classes.textCardInfo}>
                        {maquina.proxima_manutencao}
                      </span>
                    </p>
                    <button
                      className={classes.botaoVerMais}
                      onClick={() => navigate(`/maquinas/${maquina.id}`)}
                    >
                      Ver Mais
                    </button>
                  </div>
                </div>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
export default MaquinasList;
