import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOperario from "../Botoes/AdicionarOperario";
import classes from "./listaUsers.module.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  CaretUpDown,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import swal from "sweetalert";
import HeaderPage from "../Header/header";
import { Button } from "react-bootstrap";

function UsersList({ users }) {
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
        swal("User não apagada", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Utilizador não apagado");
      }
    });
  }

  const [sortUsers, setSortUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(sortUsers);

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortUsers(filteredUsers);
  }, [users, searchQuery]);

  function __refresh() {
    window.location.reload(false);
  }
  const arrowSort = {
    color: "#120309",
    opacity: "40%",
  };
  return (
    <div>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <h1>Operários</h1>
      <AdicionarOperario />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className={classes.iconRefresh}
      />
      <div className={classes.filterBarUsers}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${classes.filterBarUserItem} ${classes.searchBarUsers}`}
          placeholder="Procurar"
        />
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
      </div>
      <Table
        bordered
        className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
        style={{ color: "#120309" }}
      >
        <thead>
          <tr>
            <th key="id">
              Utilizador ID
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="nome">
              NOME
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="tipo">
              TIPO
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortUsers.map((user) => (
            <tr key={user.id}>
              <td className={classes.highlightHext}>
                <span>{user.id}</span>
              </td>
              <td className={classes.highlightHext}>
                <span>{user.nome}</span>
              </td>
              <td className={classes.highlightHext}>
                <span>{user.tipo}</span>
                &nbsp;&nbsp;
                <Button
                  style={{ width: "8em", fontSize: "10px", color: "white" }}
                >
                  Alterar
                </Button>
              </td>
              <td>
                <span>
                  <Link style={{ color: "black" }} to={`/users/${user.id}`}>
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/users/editar`}>
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
export default UsersList;
