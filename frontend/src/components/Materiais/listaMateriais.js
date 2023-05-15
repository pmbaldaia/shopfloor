import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarMaterial from "../Botoes/AdicionarMateriais";
import "./listaMateriais.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function MateriaisList({ materiais }) {
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
        swal("Material não apagado", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Material não apagado");
      }
    });
  }

  const [sortMateriais, setSortMateriais] = useState([]);

  useEffect(() => {
    setSortMateriais([...materiais]);
  }, [materiais]);

  function __refresh() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Materiais</h1>
      <AdicionarMaterial />
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
            <th key="id">MATERIAL ID</th>
            <th key="material">MATERIAL</th>
            <th key="estado">ESTADO</th>
            <th key="stock">STOCK</th>
            <th key="quantidade">QUANTIDADE</th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortMateriais.map((material) => (
            <tr key={material.id}>
              <td className="highlight-text">
                <span>{material.id}</span>
              </td>
              <td className="highlight-text">
                <span>{material.material}</span>
              </td>
              <td className="highlight-text">
                <span>{material.estado}</span>
              </td>
              <td className="highlight-text">
                <span>{material.stock}</span>
              </td>
              <td className="highlight-text">
                <span>{material.quantidade}</span>
              </td>
              <td>
                <span>
                  <Link
                    style={{ color: "black" }}
                    to={`/materiais/${material.id}`}
                  >
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/materiais/editar`}>
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
export default MateriaisList;
