import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOperario from "../Botoes/AdicionarOperario";
import "./listaOperarios.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  CaretUpDown,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function OperariosList({ operarios }) {
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
        swal("Operario não apagada", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Operario não apagada");
      }
    });
  }

  const [sortOperarios, setSortOperarios] = useState([]);

  useEffect(() => {
    setSortOperarios([...operarios]);
  }, [operarios]);

  function __refresh() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Operários</h1>
      <AdicionarOperario />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className="iconRefresh"
      />

      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">
              OPERARIO ID
              <CaretUpDown />
            </th>
            <th key="sap">
              NOME
              <CaretUpDown />
            </th>
            {/* <th key="sap">
              TAREFA
              <CaretUpDown />
            </th> */}
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortOperarios.map((operario) => (
            <tr key={operario.id}>
              <td className="highlight-text">
                <span>{operario.id}</span>
              </td>
              <td className="highlight-text">
                <span>{operario.nome}</span>
              </td>
              {/* <td className="highlight-text">
                <span>{operario.tarefa}</span>
              </td> */}
              <td>
                <span>
                  <Link
                    style={{ color: "black" }}
                    to={`/operarios/${operario.id}`}
                  >
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/operarios/editar`}>
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
      </Table>
    </div>
  );
}
export default OperariosList;
