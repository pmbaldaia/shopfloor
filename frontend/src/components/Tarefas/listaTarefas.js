import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarTarefa from "../Botoes/AdicionarTarefas";
import "./listaTarefas.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  CaretUpDown,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import swal from "sweetalert";

function TarefasList({ tarefas }) {
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
        swal("Tarefa não apagado", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Tarefa não apagado");
      }
    });
  }

  const [sortTarefas, setSortTarefas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredTarefas = tarefas.filter(
      (tarefa) =>
        tarefa.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tarefa.tarefa.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortTarefas(filteredTarefas);
  }, [tarefas, searchQuery]);

  function __refresh() {
    window.location.reload(false);
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <AdicionarTarefa />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className="iconRefresh"
      />
      <div className="filterBarTarefas">
        Procurar:{" "}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filterBarTarefa-item searchBarTarefas"
          placeholder=""
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>

      <Table bordered className="table-spacing" style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">
              TAREFA ID
              <CaretUpDown />
            </th>
            <th key="tarefa">
              TAREFA
              <CaretUpDown />
            </th>
            <th key="produto">
              PRODUTO
              <CaretUpDown />
            </th>
            <th key="operacao">
              OPERACAO
              <CaretUpDown />
            </th>
            <th key="estado">
              ESTADO
              <CaretUpDown />
            </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortTarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td className="highlight-text">
                <span>{tarefa.id}</span>
              </td>
              <td className="highlight-text">
                <span>{tarefa.tarefa}</span>
              </td>
              <td className="highlight-text">
                <span>{tarefa.produto}</span>
              </td>
              <td className="highlight-text">
                <span>{tarefa.operacao}</span>
              </td>
              <td className="highlight-text">
                <span>{tarefa.estado}</span>
              </td>
              <td>
                <span>
                  <Link style={{ color: "black" }} to={`/tarefas/${tarefa.id}`}>
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/tarefas/editar`}>
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
export default TarefasList;
