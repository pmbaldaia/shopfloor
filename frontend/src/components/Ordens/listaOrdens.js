import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import { MagnifyingGlass, Info } from "@phosphor-icons/react";
import "react-datepicker/dist/react-datepicker.css";
import OrdensComponent from "../Overlays/ordemOverlay";
import HeaderPage from "../Header/header";

import "./listaOrdens.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  CaretUpDown,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function OrdensList({ ordens }) {
  function CorEstado({ ordem }) {
    const backgroundColor =
      ordem.estado === "Em Atraso"
        ? "#F58283"
        : ordem.estado === "Concluído"
        ? "#70CC7A"
        : "#FFF";

    const color = ordem.estado === "Em Atraso" ? "white" : "black";

    return { backgroundColor, color };
  }

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate /* setSelectedDate */] = useState(null);

  useEffect(() => {
    setSortOrdens([...ordens]);
  }, [ordens]);

  useEffect(() => {
    const filteredOrdens = ordens.filter((ordem) => {
      const searchData = searchQuery.toLowerCase();
      const dataEntrega = ordem.data_entrega.toLowerCase();

      return (
        (ordem.id.toLowerCase().includes(searchData) ||
          ordem.sap.toLowerCase().includes(searchData) ||
          ordem.ordem_venda.toLowerCase().includes(searchData) ||
          ordem.produto.toLowerCase().includes(searchData) ||
          ordem.produto.includes(searchQuery.toLowerCase()) ||
          ordem.prioridade.toLowerCase().includes(searchData) ||
          ordem.prioridade.includes(searchQuery.toLowerCase()) ||
          ordem.estado.toLowerCase().includes(searchData) ||
          ordem.estado.includes(searchQuery.toLowerCase()) ||
          dataEntrega.includes(searchData)) &&
        (selectedDate
          ? new Date(ordem.data_entrega).toDateString() ===
            selectedDate.toDateString()
          : true)
      );
    });

    setSortOrdens(filteredOrdens);
  }, [searchQuery, ordens, selectedDate]);

  function __refresh() {
    window.location.reload(false);
  }

  /* //Código do ordenar por ID da ordem
  const __handleSortID = () => {
    const sortedOrdens = [...sortOrdens].sort((a, b) => a.id - b.id);
    setSortOrdens(sortedOrdens);
  }; */

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <div className="head">
        <h1>Ordens</h1>
        <ArrowClockwise
          size={28}
          weight="light"
          onClick={__refresh}
          cursor="pointer"
          className="iconRefresh"
        />
        <AdicionarOrdem />
      </div>
      <div className="filterBarOrdem">
        <input
          type="text"
          value={searchQuery}
          className="filterBarOrdem-item, searchBarFunc"
          onChange={handleSearchChange}
          placeholder="Procurar"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>

      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">
              ORDEM ID
              <CaretUpDown />
            </th>
            <th key="sap">
              SAP <CaretUpDown />
            </th>
            <th key="ordem_venda">
              ORDEM VENDA <CaretUpDown />
            </th>
            <th key="produto">
              PRODUTO <CaretUpDown />
            </th>
            <th key="quantidasde">
              QUANTIDADE <CaretUpDown />
            </th>
            <th key="liberado">
              LIBERADO <CaretUpDown />
            </th>
            <th key="data_entrega">
              DATA ENTREGA <CaretUpDown />
            </th>
            <th key="prioridade">
              PRIORIDADE <CaretUpDown />
            </th>
            <th key="estado">
              ESTADO <CaretUpDown />
            </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortOrdens.map((ordem) => (
            <tr key={ordem.id} style={CorEstado({ ordem })}>
              <td className="highlight-text">
                <span>{ordem.id}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.sap}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.ordem_venda}</span>
              </td>
              <td className="highlight-text-2">
                <OrdensComponent descricao={ordem.descricao}>
                  <span>
                    {ordem.produto}
                    <Info size={20} className="mx-1" />
                  </span>
                </OrdensComponent>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default OrdensList;
