import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarMaquina from "../Botoes/AdicionarMaquinas";
import "./listaMaquinas.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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

  useEffect(() => {
    setSortMaquinas([...maquinas]);
  }, [maquinas]);

  function __refresh() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Máquinas</h1>
      <AdicionarMaquina />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className="iconRefresh"
      />
      <div>
        {sortMaquinas.map((maquina) => (
          <Card style={{ width: "20rem" }}>
            <Card.Img variant="top" src={maquina.imagem} />
            <Card.Body>
              <Card.Title>{maquina.nome}</Card.Title>
              <Card.Text>
                <b>Última Manutenção: </b>
                {maquina.ultima_manutencao}
              </Card.Text>
              <Card.Text>
                <b>Próxima Manutenção: </b> {maquina.proxima_manutencao}
              </Card.Text>
              <Button>Ver Mais</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* <Table bordered className="table-spacing" style={{ color: "#120309" }}> */}
      {/*  <thead>
          <tr> */}
      {/*<th key="id">MAQUINA ID</th>
            <th key="nome">NOME</th>
            <th key="fabricante">FABRICANTE</th>
            <th key="data_aquisicao">DATA AQUISIÇÃO</th>
            <th key="ultima_manutencao">ÚLTIMA MANUTENÇÃO</th>
            <th key="modelo">MODELO</th>
            <th key="estado">ESTADO</th>
            <th key="acoes">AÇÕES</th>*/}
      {/* </tr> */}
      {/*  </thead>
        <tbody> */}
      {/* {sortMaquinas.map((maquina) => (
            <tr key={maquina.id}>
              <td className="highlight-text">
                <span>{maquina.id}</span>
                <img
                  src={maquina.imagem}
                  alt="imagemMaquina"
                  style={{ width: "30px" }}
                />
                <span>{maquina.data_aquisicao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.nome}</span>
              </td> */}
      {/* <td className="highlight-text">
                <span>{maquina.fabricante}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.data_aquisicao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.ultima_manutencao}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.modelo}</span>
              </td>
              <td className="highlight-text">
                <span>{maquina.estado}</span>
              </td> */}
      {/* <td>
                <span>
                  <Link
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
                    </td> */}
      {/*  </tr>
          ))} */}
      {/* 
        </tbody>
      </Table> */}
    </div>
  );
}
export default MaquinasList;
