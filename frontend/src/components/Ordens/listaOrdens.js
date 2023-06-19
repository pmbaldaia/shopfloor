import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import {
  ArrowClockwise,
  ReadCvLogo,
  DownloadSimple,
  CaretUp,
  CaretDown,
  MagnifyingGlass,
  Info,
} from "@phosphor-icons/react";
import "react-datepicker/dist/react-datepicker.css";
import OrdensOverLayDescricao from "../Overlays/ordemOverlay";
import HeaderPage from "../Header/header";
import classes from "./listaOrdens.module.css";
import * as XLSX from "xlsx";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePickerOrdens from "./calendarListaOrdens.js";

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

  /* const submit = () => {}; */

  const [sortOrdens, setSortOrdens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate /* setSelectedDate */] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortSAP, setSortSAP] = useState("desc");
  const [sortORDEM_VENDA, setSortORDEM_VENDA] = useState("desc");
  const [sortPRODUTO, setSortPRODUTO] = useState("desc");
  const [sortQUANTIDADE, setSortQUANTIDADE] = useState("desc");
  const [selectedFilterEstado, setSelectedFilterEstado] = useState("");
  const [selectedFilterPrioridade, setSelectedFilterPrioridade] = useState("");
  const [filteredDates, setFilteredDates] = useState([]);

  const handleFilterEstadoChange = (event) => {
    setSelectedFilterEstado(event.target.value);
  };

  const handleFilterPrioridadeChange = (event) => {
    setSelectedFilterPrioridade(event.target.value);
  };

  useEffect(() => {
    setSortOrdens([...ordens]);
  }, [ordens]);

  //para teste de contar ordens
  const [totalOrdens, setTotalOrdens] = useState(0);
  const [totalPendente, setTotalPendente] = useState(0);
  const [totalEmProgresso, setTotalEmProgresso] = useState(0);
  const [totalEmAtraso, setTotalEmAtraso] = useState(0);
  const [totalConcluido, setTotalConcluido] = useState(0);

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

    setFilteredDates(filteredOrdens);

    //para teste de contar ordens
    const total = filteredOrdens.length;
    const pendente = filteredOrdens.filter(
      (ordem) => ordem.estado === "Pendente"
    ).length;
    const emProgresso = filteredOrdens.filter(
      (ordem) => ordem.estado === "Em Progresso"
    ).length;
    const emAtraso = filteredOrdens.filter(
      (ordem) => ordem.estado === "Em Atraso"
    ).length;
    const concluido = filteredOrdens.filter(
      (ordem) => ordem.estado === "Concluído"
    ).length;
    setTotalOrdens(total);
    setTotalPendente(pendente);
    setTotalEmProgresso(emProgresso);
    setTotalEmAtraso(emAtraso);
    setTotalConcluido(concluido);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const __handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(ordens);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ordens");

    // Definir tamanho das colunas
    const columnWidths = [];
    const totalColumns = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]
      .length;
    for (let i = 0; i < totalColumns; i++) {
      columnWidths.push({ width: 30 });
    }
    worksheet["!cols"] = columnWidths;

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ordens.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={classes.listaOrdens}>
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
        <DownloadSimple
          onClick={__handleDownload}
          size={28}
          weight="light"
          cursor="pointer"
          className={classes.iconDownload}
          alt="Download Lista"
        />

        <AdicionarOrdem />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            float: "right",
            marginTop: "1.2em",
            alignItems: "center",
            marginRight: "1em",
          }}
        >
          <DateRangePickerOrdens />
        </div>
      </div>
      <Container fluid>
        <Row className={classes.containerOrdensBorder}>
          <Col
            lg={2}
            className={`${classes.boxOrdensBorder} ${classes.colMargin} ${classes.boxOrdens2rd} ${classes.textoOrdensBox}`}
          >
            <span>Total</span>
            <span>{totalOrdens}</span>
          </Col>
          <Col
            lg={2}
            className={`${classes.boxOrdensBorder} ${classes.colMargin} ${classes.boxOrdens2rd} ${classes.textoOrdensBox}`}
          >
            <span>Pendente</span>
            <span>{totalPendente}</span>
          </Col>
          <Col
            lg={2}
            className={`${classes.boxOrdensBorder} ${classes.colMargin} ${classes.boxOrdens3rd} ${classes.textoOrdensBox}`}
          >
            <span> Progresso</span>
            <span>{totalEmProgresso}</span>
          </Col>
          <Col
            lg={2}
            className={`${classes.boxOrdensBorder} ${classes.colMargin} ${classes.boxOrdens4th} ${classes.textoOrdensBox}`}
          >
            <span>Concluído</span>
            <span>{totalConcluido}</span>
          </Col>
          <Col
            lg={2}
            className={`${classes.boxOrdensBorder} ${classes.colMargin} ${classes.boxOrdens5th} ${classes.textoOrdensBox}`}
          >
            <span>Em atraso</span>
            <span>{totalEmAtraso}</span>
          </Col>
        </Row>
      </Container>
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
              <div onClick={__handleSortSAP} style={{ position: "relative" }}>
                <span> SAP</span>
                {sortSAP === "desc" ? (
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
                {sortSAP === "asc" ? (
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
            <th key="ordem_venda">
              <div
                onClick={__handleSortORDEM_VENDA}
                style={{ position: "relative" }}
              >
                <span> ORDEM DE VENDA</span>
                {sortORDEM_VENDA === "desc" ? (
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
                {sortORDEM_VENDA === "asc" ? (
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
            <th key="quantidade">
              <div
                onClick={__handleSortQUANTIDADE}
                style={{ position: "relative" }}
              >
                <span> QUANTIDADE</span>
                {sortQUANTIDADE === "desc" ? (
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
                {sortQUANTIDADE === "asc" ? (
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
            <th key="produto">
              <div
                onClick={__handleSortPRODUTO}
                style={{ position: "relative" }}
              >
                <span> PRODUTO</span>
                {sortPRODUTO === "desc" ? (
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
                {sortPRODUTO === "asc" ? (
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

            <th key="liberado">
              LIBERADO{" "}
              {/*  <CaretUpDown
                size={16}
                onClick={__handleSortLIBERADO}
                weight="fill"
                style={arrowSort}
                className={`${classes.arrowUp} ${
                  sortLIBERADO === "asc" ? classes.arrowUp : classes.arrowDown
                }`}
              /> */}
            </th>
            <th key="data_entrega">
              DATA ENTREGA{" "}
              {/*  <CaretUpDown
                size={16}
                weight="fill"
                style={arrowSort}
                onClick={__handleSortDATA_ENTREGA}
                className={`${classes.arrowUp} ${
                  sortDATA_ENTREGA === "asc"
                    ? classes.arrowUp
                    : classes.arrowDown
                }`}
              /> */}
            </th>
            <th key="prioridade">PRIORIDADE </th>
            <th key="estado">ESTADO </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {filteredDates.map((ordem) => (
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
                <span>{ordem.quantidade}</span>
              </td>
              <td className={classes.highlightText2}>
                <OrdensOverLayDescricao descricao={ordem.descricao}>
                  <span>
                    {ordem.produto}
                    <Info size={20} className="mx-1" />
                  </span>
                </OrdensOverLayDescricao>
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
                    <ReadCvLogo size={28} weight="light" alt="CONSULTAR" />
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
export default OrdensList;
