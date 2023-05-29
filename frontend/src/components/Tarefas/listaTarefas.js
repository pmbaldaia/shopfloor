import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdicionarTarefa from "../Botoes/AdicionarTarefas";
import classes from "./listaTarefas.module.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import swal from "sweetalert";
import HeaderPage from "../Header/header";
import { Table } from "react-bootstrap";

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
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <h1>Tarefas</h1>
      <AdicionarTarefa />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className={classes.iconRefresh}
      />
      <div className={classes.filterBarTarefas}>
        &nbsp;
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${classes.filterBarTarefaItem} ${classes.searchBarTarefas}`}
          placeholder="Procurar"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>

      <Table
        bordered
        className={classes.tableSpacing}
        style={{ color: "#120309" }}
      >
        <thead>
          <tr>
            <th>ORDEM ASSOCIADA</th>
            <th>PRODUTO</th>
            <th>OPERÁRIO(s) ASSOCIADO(s)</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        {sortTarefas.map((tarefa) => (
          <tbody>
            <tr key={tarefa.id}>
              <td>{tarefa.ordem_associada}</td>
              <td>{tarefa.produto}</td>
              <td>
                {tarefa.operario_associado
                  ? tarefa.operario_associado.join(", ")
                  : ""}
              </td>
              <td>
                <span>
                  <Link style={{ color: "black" }} to={`/tarefas/${tarefa.id}`}>
                    <ReadCvLogo size={25} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/tarefas/editar`}>
                    <Pencil size={25} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} onClick={startDeleteHandler}>
                    <Trash size={25} weight="light" />
                  </Link>
                </span>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}
export default TarefasList;
