import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";
import { Link, useSubmit /* , useRouteLoaderData */ } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import "./listaOrdens.css";
import {
  ArrowClockwise,
  SortAscending,
  ReadCvLogo,
  Pencil,
  Trash,
  Info,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function OrdensList({ ordens }) {
  function CorEstado({ ordem }) {
    const backgroundColor =
      ordem.estado === "EM ATRASO"
        ? "#F58283"
        : ordem.estado === "CONCLUÍDO"
        ? "#70CC7A"
        : "#FFF";

    const color = ordem.estado === "EM ATRASO" ? "white" : "black";

    return { backgroundColor, color };
  }

  const submit = useSubmit();
  const [show, setShow] = useState(false);
  const target = useRef(null);

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
    <div>
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
      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">ORDEM ID</th>
            <th key="sap">SAP</th>
            <th key="sap">ORDEM VENDA</th>
            <th key="produto">PRODUTO</th>
            <th key="quantidade">QUANTIDADE</th>
            <th key="liberado">LIBERADO</th>
            <th key="data_entrega">DATA ENTREGA</th>
            <th key="prioridade">PRIORIDADE</th>
            <th key="estado">ESTADO</th>
            {/* {token && <th key="acoes">AÇÕES</th>} */}
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortOrdens.map((ordem) => (
            <tr key={ordem.id} style={CorEstado({ ordem })}>
              <td className="highlight-text">
                <span>{ordem.id}</span>
              </td>
              <td className="highlight-text">
                <span>{ordem.sap}</span>
              </td>
              <td className="highlight-text">
                <span>{ordem.ordem_producao}</span>
              </td>
              <td className="highlight-text-2">
                <span>
                  {ordem.produto}{" "}
                  <Info size={30} ref={target} onClick={() => setShow(!show)} />
                  <Overlay
                    target={target.current}
                    show={show}
                    placement="right"
                  >
                    {({
                      placement,
                      arrowProps,
                      show: _show,
                      popper,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          backgroundColor: "rgba(255, 100, 100, 0.85)",
                          padding: "2px 10px",
                          color: "white",
                          borderRadius: 3,
                        }}
                      >
                        {ordem.descricao}
                      </div>
                    )}
                  </Overlay>
                </span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.quantidade}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.liberado}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.data_entrega}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.prioridade}</span>
              </td>
              <td className="highlight-text">
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
      </Table>
    </div>
  );
}
export default OrdensList;
