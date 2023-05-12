import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOrdem from "../Botoes/AdicionarOrdem";
import { MagnifyingGlass, Calendar, Info } from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrdensComponent from "../Overlays/overlay";

import "./listaOrdens.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
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
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSortOrdens([...ordens]);
  }, [ordens]);

  useEffect(() => {
    const filteredOrdens = ordens.filter((ordem) => {
      const searchData = searchQuery.toLowerCase();
      const dataEntrega = ordem.data_entrega.toLowerCase();

      // Filter by id, sap, ordem_producao, and data_entrega
      return (
        (ordem.id.includes(searchData) ||
          ordem.sap.includes(searchData) ||
          ordem.ordem_producao.includes(searchData) ||
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

  //Código do ordenar por ID da ordem
  const __handleSortID = () => {
    const sortedOrdens = [...sortOrdens].sort((a, b) => a.id - b.id);
    setSortOrdens(sortedOrdens);
  };

  //Código do ordenar por PRIORIDADE
  const __handleSortPrioridade = () => {
    const sortedOrdens = [...sortOrdens].sort((a, b) => {
      const prioridadeOrder = {
        ALTA: 1,
        MÉDIA: 2,
        BAIXA: 3,
      };

      if (prioridadeOrder[a.prioridade] < prioridadeOrder[b.prioridade])
        return -1;
      if (prioridadeOrder[a.prioridade] > prioridadeOrder[b.prioridade])
        return 1;
      return 0;
    });

    setSortOrdens(sortedOrdens);
  };

  //Código para ordenar por EM ATRASO e colocar os concluídos no fim
  const __handleSortEstado = () => {
    const sortedOrdens = [...sortOrdens].sort((a, b) => {
      if (a.estado === "EM ATRASO" && b.estado !== "EM ATRASO") return -1;
      if (a.estado !== "EM ATRASO" && b.estado === "EM ATRASO") return 1;
      if (a.estado === "CONCLUÍDO" && b.estado !== "CONCLUÍDO") return 1;
      if (a.estado !== "CONCLUÍDO" && b.estado === "CONCLUÍDO") return -1;
      if (a.estado < b.estado) return -1;
      if (a.estado > b.estado) return 1;
      return 0;
    });
    setSortOrdens(sortedOrdens);
  };

  const [selectedOption, setSelectedOption] = useState("");

  // Capturar a opção selecionada
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "id") {
      __handleSortID();
    } else if (event.target.value === "estado") {
      __handleSortEstado();
    } else if (event.target.value === "prioridade") {
      __handleSortPrioridade();
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  /* const token = useRouteLoaderData("root"); */
  return (
    <>
      <div className="head">
        <h1>Ordens</h1>
        <ArrowClockwise
          size={28}
          weight="light"
          onClick={__refresh}
          cursor="pointer"
          className="iconRefresh"
        />
        {/*  {token && <AdicionarOrdem />} */}
        <AdicionarOrdem />
      </div>
      <div className="filterBarOrdem">
        <DatePicker
          selected={selectedDate}
          className="filterBarOrdem-item dataEntregaFunc"
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DATA DA ENTREGA"
          customInput={
            <div style={{ justifyContent: "center" }}>
              {selectedDate && (
                <span
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                  }}
                >
                  {selectedDate.toLocaleDateString()}
                </span>
              )}
              <Calendar
                size={27}
                color="#2e5a53"
                style={{ float: "right", paddingRight: "10px" }}
              />
            </div>
          }
        />

        <select
          value={selectedOption}
          className="filterBarOrdem-item, filterBar"
          onChange={handleSelectChange}
          style={{
            fontFamily: "Montserrat",
            fontSize: "15px",
          }}
        >
          <option value="">Selecione uma opção</option>
          <option value="id">Ordenar por ID ORDEM</option>
          <option value="estado">Ordenar por ESTADO</option>
          <option value="prioridade">Ordenar por PRIORIDADE</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          className="filterBarOrdem-item, searchBarFunc"
          onChange={handleSearchChange}
          placeholder="ID | SAP | VENDA"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>

      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">ORDEM ID</th>
            <th key="sap">SAP</th>
            <th key="ordem_venda">ORDEM VENDA</th>
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
              <td className="highlight-text-2">
                <span>{ordem.sap}</span>
              </td>
              <td className="highlight-text-2">
                <span>{ordem.ordem_producao}</span>
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
    </>
  );
}
export default OrdensList;
