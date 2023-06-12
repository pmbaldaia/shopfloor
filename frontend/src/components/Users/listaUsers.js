import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarOperario from "../Botoes/AdicionarOperario";
import classes from "./listaUsers.module.css";
import {
  ArrowClockwise,
  ReadCvLogo /* 
  Pencil,
  Trash, */,
  CaretUpDown,
  User,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import HeaderPage from "../Header/header";

function UsersList({ users, access_token }) {
  const [sortUsers, setSortUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className={classes.listaOperarios}>
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
            <th></th>
            <th key="nome">
              Dados
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="especialidade">
              ESPECIALIDADE
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>{" "}
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
              <td className={classes.highlightHext} style={{ width: "100px" }}>
                <User size={25} />
              </td>
              <td className={classes.highlightHext}>
                <span>{user.nome}</span>
              </td>
              <td className={classes.highlightHext}>
                <span>{user.especialidade}</span>
              </td>
              <td className={classes.highlightHext}>
                <span>{user.tipo}</span>
              </td>
              <td>
                <span>
                  <Link style={{ color: "black" }} to={`/users/${user.id}`}>
                    <ReadCvLogo size={28} weight="light" />
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
