import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import { MagnifyingGlass, Info } from "@phosphor-icons/react";
import "react-datepicker/dist/react-datepicker.css";
import OrdensComponent from "../Overlays/ordemOverlay";
import HeaderPage from "../Header/header";
import classes from "./listaOrdens.module.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  CaretUpDown,
  CaretUp,
  CaretDown,
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
  const [selectedFilterEstado, setSelectedFilterEstado] = useState("");
  const [selectedFilterPrioridade, setSelectedFilterPrioridade] = useState("");

  const handleFilterEstadoChange = (event) => {
    setSelectedFilterEstado(event.target.value);
  };

  const handleFilterPrioridadeChange = (event) => {
    setSelectedFilterPrioridade(event.target.value);
  };

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
          //codigo para pesquisa por prioridade e estado

          /* ordem.prioridade.toLowerCase().includes(searchData) ||
          ordem.prioridade.includes(searchQuery.toLowerCase()) ||
          ordem.estado.toLowerCase().includes(searchData) ||
          ordem.estado.includes(searchQuery.toLowerCase()) || */
          dataEntrega.includes(searchData)) &&
        (selectedFilterEstado ? ordem.estado === selectedFilterEstado : true) &&
        (selectedFilterPrioridade
          ? ordem.prioridade === selectedFilterPrioridade
          : true) &&
        (selectedDate
          ? new Date(ordem.data_entrega).toDateString() ===
            selectedDate.toDateString()
          : true)
      );
    });

    setSortOrdens(filteredOrdens);
  }, [
    searchQuery,
    ordens,
    selectedDate,
    selectedFilterEstado,
    selectedFilterPrioridade,
  ]);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <div className={classes.head}>
        <h1>Ordens</h1>
        <ArrowClockwise
          size={28}
          weight="light"
          onClick={__refresh}
          cursor="pointer"
          className={classes.iconRefresh}
        />
        <AdicionarOrdem />
      </div>
      <div className={classes.filterBarOrdem}>
        <input
          type="text"
          value={searchQuery}
          className={`${classes.filterBarOrdemItem} ${classes.searchBarFunc}`}
          onChange={handleSearchChange}
          placeholder="Procurar"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
        <select
          id="filterEstado"
          className={`${classes.filterBarOrdemItem} ${classes.filterEstado}`}
          value={selectedFilterEstado}
          onChange={handleFilterEstadoChange}
        >
          <option
            value=""
            disabled
            hidden
            style={{ color: "rgba(255, 0, 0, 0.5)" }}
          >
            Estado
          </option>
          <option value="">Todas</option>
          <option value="Em Atraso">Em atraso</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
          <option value="Em Progresso">Em progresso</option>
        </select>

        <select
          id="filterEstado"
          className={`${classes.filterBarOrdemItem} ${classes.filterPrioridade}`}
          value={selectedFilterPrioridade}
          onChange={handleFilterPrioridadeChange}
        >
          <option
            value=""
            disabled
            hidden
            style={{ color: "rgba(255, 0, 0, 0.5)" }}
          >
            Prioridade
          </option>
          <option value="">Todas</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <Table
        bordered
        className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
        style={{ color: "#120309" }}
      >
        <thead>
          <tr>
            <th key="id">
              <div onClick={__handleSortID} style={{ position: "relative" }}>
                <span> ORDEM ID</span>
                {sortOrder === "asc" ? (
                  <CaretUp
                    size={16}
                    weight=""
                    style={{ position: "absolute" }}
                  />
                ) : (
                  <CaretUp
                    size={16}
                    weight="fill"
                    style={{ position: "absolute" }}
                  />
                )}
                {sortOrder === "desc" ? (
                  <CaretDown
                    size={16}
                    weight=""
                    style={{ position: "absolute" }}
                  />
                ) : (
                  <CaretDown
                    size={16}
                    weight="fill"
                    style={{ position: "absolute" }}
                  />
                )}
              </div>
            </th>
            <th key="sap">
              SAP
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortSAP}
                className={`${classes.arrowUp} ${
                  sortSAP === "asc" ? classes.arrowUp : classes.arrowDown
                }`}
              />
            </th>
            <th key="ordem_venda">
              ORDEM VENDA
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortORDEM_VENDA}
                className={`${classes.arrowUp} ${
                  sortORDEM_VENDA === "asc"
                    ? classes.arrowUp
                    : classes.arrowDown
                }`}
              />
            </th>
            <th key="produto">
              PRODUTO{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortPRODUTO}
                className={`${classes.arrowUp} ${
                  sortPRODUTO === "asc" ? classes.arrowUp : classes.arrowDown
                }`}
              />
            </th>
            <th key="quantidade">
              QUANTIDADE
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortQUANTIDADE}
                className={`${classes.arrowUp} ${
                  sortQUANTIDADE === "asc" ? classes.arrowUp : classes.arrowDown
                }`}
              />
            </th>
            <th key="liberado">
              LIBERADO{" "}
              <CaretUpDown
                size={16}
                onClick={__handleSortLIBERADO}
                weight="fill"
                style={arrowSort}
                className={`${classes.arrowUp} ${
                  sortLIBERADO === "asc" ? classes.arrowUp : classes.arrowDown
                }`}
              />
            </th>
            <th key="data_entrega">
              DATA ENTREGA{" "}
              <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortDATA_ENTREGA}
                className={`${classes.arrowUp} ${
                  sortDATA_ENTREGA === "asc"
                    ? classes.arrowUp
                    : classes.arrowDown
                }`}
              />
            </th>
            <th key="prioridade">PRIORIDADE </th>
            <th key="estado">ESTADO </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredOrdens.map((ordem) => ( */}
          {sortOrdens.map((ordem) => (
            <tr key={ordem.id} style={CorEstado({ ordem })}>
              <td className={classes.highlightText}>
                <span>{ordem.id}</span>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.sap}</span>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.ordem_venda}</span>
              </td>
              <td className={classes.highlightText2}>
                <OrdensComponent descricao={ordem.descricao}>
                  <span>
                    {ordem.produto}
                    <Info size={20} className="mx-1" />
                  </span>
                </OrdensComponent>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.quantidade}</span>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.liberado}</span>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.data_entrega}</span>
              </td>
              <td className={classes.highlightText2}>
                <span>{ordem.prioridade}</span>
              </td>
              <td className={classes.highlightText}>
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
