import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AdicionarMaquina from "../Botoes/AdicionarMaquinas";
import "./listaMaquinas.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import swal from "sweetalert";
import HeaderPage from "../Header/header";

function MaquinasList({ maquinas }) {
  const submit = () => {};

  function startDeleteHandler() {
    swal({
      title: "Tem a certeza que quer apagar?",
      text: "Uma vez apagado, não poderá recuperá-lo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submit({ method: "delete" });
        swal("Maquina não apagada", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Maquina não apagada");
      }
    });
  }

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
        className="iconRefresh"
      />
      <div className="filterBarMaquinas">
        Procurar:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filterBarMquina-item searchBarMaquinas"
          placeholder=""
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>
      {/*       <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">MAQUINA ID</th>
            <th key="imagem">IMAGEM</th>
            <th key="nome">NOME</th>
            <th key="fabricante">FABRICANTE</th>
            <th key="data_aquisicao">DATA AQUISIÇÃO</th>
            <th key="ultima_manutencao">ÚLTIMA MANUTENÇÃO</th>
            <th key="proxima_manutencao">PRÓXIMA MANUTENÇÃO</th>
            <th key="modelo">MODELO</th>
            <th key="estado">ESTADO</th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortMaquinas.map((maquina) => (
            <tr key={maquina.id}>
              <td className="highlight-text">
                <span>{maquina.id}</span>
              </td>
              <td className="highlight-text">
                <img
                  src={maquina.imagem}
                  style={{ width: "fit-content", height: "50px" }}
                />
              </td>
              <td className="highlight-text">
                <span>{maquina.nome}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.fabricante}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.data_aquisicao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.ultima_manutencao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.proxima_manutencao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.modelo}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.estado}</span>
              </td>
              <td>
                <span><Link
                    style={{ color: "black" }}
                    to={`/maquinas/${maquina.id}`}
                  >
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/maquinas/editar`}>
                    <Pencil size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} onClick={startDeleteHandler}>
                    <Trash size={28} weight="light" />
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <p>{}</p>

      <Container>
        <Row>
          {sortMaquinas.map((maquina) => (
            <Col md={6} key={maquina.id}>
              <Row className="spacingMaquinas">
                <div className="card flex-row">
                  <img
                    className="card-img-left"
                    src={maquina.imagem}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title h5 h4-sm">Left image</h4>
                    <p className="card-text">
                      Última Manutenção: {maquina.ultima_manutencao}
                    </p>
                    <p className="card-text">
                      Próxima Manutenção: {maquina.proxima_manutencao}
                    </p>

                    <Button className="botaoVerMais">
                      <Link to={`/maquinas/${maquina.id}`}>Ver Mais</Link>
                    </Button>
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
