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
    const estadoLowerCase = ordem.estado.toLowerCase();
    const backgroundColor =
      estadoLowerCase === "em atraso"
        ? "#F58283"
        : estadoLowerCase === "concluído"
        ? "#70CC7A"
        : "#FFF";

    const color = estadoLowerCase === "em atraso" ? "white" : "black";

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
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortSAP, setSortSAP] = useState("desc");
  const [sortORDEM_VENDA, setSortORDEM_VENDA] = useState("desc");
  const [sortPRODUTO, setSortPRODUTO] = useState("desc");
  const [sortQUANTIDADE, setSortQUANTIDADE] = useState("desc");
  const [sortLIBERADO, setSortLIBERADO] = useState("desc");
  const [sortDATA_ENTREGA, setSortDATA_ENTREGA] = useState("desc");
  const [sortPRIORIDADE, setSortPRIORIDADE] = useState("desc");

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

  const arrowSort = {
    color: "#120309",
    opacity: "40%",
  };

  // Código do ordenar por ID da ordem ASC:DESC
  const __handleSortID = () => {
    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedOrdens = [...sortOrdens].sort((a, b) =>
      nextOrder === "desc" ? a.id - b.id : b.id - a.id
    );
    setSortOrdens(sortedOrdens);
    setSortOrder(nextOrder);
  };

  // Código do ordenar por código SAP ASC:DESC
  const __handleSortSAP = () => {
    const nextSAP = sortSAP === "asc" ? "desc" : "asc";
    const sortedSAP = [...sortOrdens].sort((a, b) =>
      a.sap.localeCompare(b.sap)
    );
    const orderedSAP = nextSAP === "asc" ? sortedSAP : sortedSAP.reverse();
    setSortOrdens(orderedSAP);
    setSortSAP(nextSAP);
  };

  // Código do ordenar por ORDEM_VENDA ASC:DESC
  const __handleSortORDEM_VENDA = () => {
    const nextORDEM_VENDA = sortORDEM_VENDA === "asc" ? "desc" : "asc";
    const sortedORDEM_VENDA = [...sortOrdens].sort((a, b) =>
      a.ordem_venda.localeCompare(b.ordem_venda)
    );
    const orderedORDEM_VENDA =
      nextORDEM_VENDA === "asc"
        ? sortedORDEM_VENDA
        : sortedORDEM_VENDA.reverse();
    setSortOrdens(orderedORDEM_VENDA);
    setSortORDEM_VENDA(nextORDEM_VENDA);
  };

  // Código de ordenar por PRODUTO ASC:DESC
  const __handleSortPRODUTO = () => {
    const nextPRODUTO = sortPRODUTO === "asc" ? "desc" : "asc";
    const sortedPRODUTO = [...sortOrdens].sort((a, b) =>
      a.produto.localeCompare(b.produto)
    );
    const orderedPRODUTO =
      nextPRODUTO === "asc" ? sortedPRODUTO : sortedPRODUTO.reverse();
    setSortOrdens(orderedPRODUTO);
    setSortPRODUTO(nextPRODUTO);
  };

  // Código de ordenar pela quantidade ASC:DESC
  const __handleSortQUANTIDADE = () => {
    const nextQUANTIDADE = sortQUANTIDADE === "asc" ? "desc" : "asc";
    const sortedQUANTIDADE = [...sortOrdens].sort(
      (a, b) => a.quantidade - b.quantidade
    );
    const orderedQUANTIDADE =
      nextQUANTIDADE === "asc" ? sortedQUANTIDADE : sortedQUANTIDADE.reverse();
    setSortOrdens(orderedQUANTIDADE);
    setSortQUANTIDADE(nextQUANTIDADE);
  };

  // Código de ordenar pela data Liberado ASC:DESC
  const __handleSortLIBERADO = () => {
    const nextLIBERADO = sortLIBERADO === "asc" ? "desc" : "asc";
    const sortedLIBERADO = [...sortOrdens].sort(
      (a, b) => a.liberado - b.liberado
    );
    const orderedLIBERADO =
      nextLIBERADO === "asc" ? sortedLIBERADO : sortedLIBERADO.reverse();
    setSortOrdens(orderedLIBERADO);
    setSortLIBERADO(nextLIBERADO);
  };

  // Código de ordenar pela data entrega ASC:DESC
  const __handleSortDATA_ENTREGA = () => {
    const nextDATA_ENTREGA = sortDATA_ENTREGA === "asc" ? "desc" : "asc";
    const sortedDATA_ENTREGA = [...sortOrdens].sort(
      (a, b) => new Date(a.data_entrega) - new Date(b.data_entrega)
    );
    const orderedDATA_ENTREGA =
      nextDATA_ENTREGA === "asc"
        ? sortedDATA_ENTREGA
        : sortedDATA_ENTREGA.reverse();
    setSortOrdens(orderedDATA_ENTREGA);
    setSortDATA_ENTREGA(nextDATA_ENTREGA);
  };

  // Código de ordenar pela prioridade ASC:DESC
  const __handleSortPRIORIDADE = () => {
    const nextPRIORIDADE = sortPRIORIDADE === "asc" ? "desc" : "asc";
    const sortedPRIORIDADE = [...sortOrdens].sort((a, b) =>
      a.prioridade.localeCompare(b.prioridade, undefined, { numeric: true })
    );
    const orderedPRIORIDADE =
      nextPRIORIDADE === "asc" ? sortedPRIORIDADE : sortedPRIORIDADE.reverse();
    setSortOrdens(orderedPRIORIDADE);
    setSortPRIORIDADE(nextPRIORIDADE);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const estadoOrdem = [
    { value: "Todos", label: "Todos" },
    { value: "Concluído", label: "Concluído" },
    { value: "Pendente", label: "Pendente" },
    { value: "Em Progresso", label: "Em Progresso" },
    { value: "Em Atraso", label: "Em Atraso" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredOrdens = ordens.filter((ordem) =>
    selectedFilter ? ordem.estado === selectedFilter : true
  );

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
        <select
          id="filterEstado"
          className="filterBarOrdem-item filterEstado"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option disabled selected hidden>
            Estado
          </option>
          <option value="">Todas</option>
          <option value="Em Atraso">Em atraso</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
          <option value="Em Progresso">Em progresso</option>
        </select>
      </div>

      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">
              ORDEM ID
              <CaretUpDown
                size={16}
                onClick={__handleSortID}
                weight="fill"
                style={arrowSort}
              />
            </th>
            <th key="sap">
              SAP
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortSAP}
              />
            </th>
            <th key="ordem_venda">
              ORDEM VENDA
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortORDEM_VENDA}
              />
            </th>
            <th key="produto">
              PRODUTO{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortPRODUTO}
              />
            </th>
            <th key="quantidade">
              QUANTIDADE
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortQUANTIDADE}
              />
            </th>
            <th key="liberado">
              LIBERADO{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortLIBERADO}
              />
            </th>
            <th key="data_entrega">
              DATA ENTREGA{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortDATA_ENTREGA}
              />
            </th>
            <th key="prioridade">
              PRIORIDADE{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortPRIORIDADE}
              />
            </th>
            <th key="estado">ESTADO </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrdens.map((ordem) => (
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
