import React, { useState, useEffect } from "react";
import { Link, useSubmit /* , useRouteLoaderData */ } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import classes from "./listaOrdens.module.css";
import {
  ArrowClockwise,
  SortAscending,
  ReadCvLogo,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function OrdensList({ ordens }) {
  function CorPrioridade({ ordem }) {
    const backgroundColor =
      ordem.prioridade === "BAIXA"
        ? "yellow"
        : ordem.prioridade === "MÉDIA"
        ? "orange"
        : "red";

    const color =
      ordem.prioridade === "BAIXA"
        ? "black"
        : ordem.prioridade === "MÉDIA"
        ? "black"
        : "white";

    return { backgroundColor, color };
  }

  const submit = useSubmit();
  /* function startDeleteHandler() {
    swal({
      title: "Tem a certeza que quer apagar?",
      text: "Uma vez apagado, não poderá recuperá-lo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submit({ method: "delete" });
        swal("Ordem eliminada com sucesso", {
          icon: "success",
        });
      } else {
        swal("Ordem não apagada");
      }
    });
  } */
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
        swal("Ordem não apagada", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Ordem não apagada");
      }
    });
  }

  const [sortOrdens, setSortOrdens] = useState([]);

  useEffect(() => {
    setSortOrdens([...ordens]);
  }, [ordens]);

  function __refresh() {
    window.location.reload(false);
  }

  const __handleSort = () => {
    const sortedOrdens = [...sortOrdens].sort((a, b) => a.id - b.id);
    setSortOrdens(sortedOrdens);
  };
  /* const token = useRouteLoaderData("root"); */
  return (
    <div className={classes.ordens}>
      <h1>Ordens</h1>
      {/*  {token && <AdicionarOrdem />} */}
      <AdicionarOrdem />
      <ArrowClockwise
        size={28}
        weight="light"
        style={{ marginTop: "0.8em", marginLeft: "0.6em" }}
        onClick={__refresh}
        cursor="pointer"
      />
      &nbsp;
      <SortAscending
        size={28}
        weight="light"
        style={{ marginTop: "0.8em", marginLeft: "0.6em" }}
        onClick={__handleSort}
        cursor="pointer"
      />
      <table>
        <thead>
          <tr>
            <th key="id">ID</th>
            <th key="imagem">IMAGEM</th>
            <th key="produto">PRODUTO</th>
            <th key="prioridade">PRIORIDADE</th>
            <th key="estado">ESTADO</th>
            {/* {token && <th key="acoes">AÇÕES</th>} */}
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortOrdens.map((ordem) => (
            <tr key={ordem.id}>
              <td>
                <span>{ordem.id}</span>
              </td>
              <td>
                <span>
                  <img
                    src={ordem.imagem}
                    className={classes.imagem}
                    alt="ImagemProduto"
                  />
                </span>
              </td>
              <td>
                <span>{ordem.produto}</span>
              </td>
              <td style={CorPrioridade({ ordem })}>
                <span style={CorPrioridade({ ordem })}>{ordem.prioridade}</span>
              </td>
              <td>
                <span>{ordem.estado}</span>
              </td>
              {/* {token && ( */}
              <td>
                <span>
                  <Link style={{ color: "black" }} to={`/ordens/${ordem.id}`}>
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/ordens/editar`}>
                    <Pencil size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} onClick={startDeleteHandler}>
                    <Trash size={28} weight="light" />
                  </Link>
                </span>
              </td>
              {/* )} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrdensList;
