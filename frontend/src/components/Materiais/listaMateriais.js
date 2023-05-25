import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarMaterial from "../Botoes/AdicionarMateriais";
import classes from "./listaMateriais.module.css";
import {
  ArrowClockwise,
  ReadCvLogo,
  Pencil,
  Trash,
  MagnifyingGlass,
  CaretUpDown,
} from "@phosphor-icons/react";
import swal from "sweetalert";
import HeaderPage from "../Header/header";

function MateriaisList({ materiais }) {
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
        swal("Material não apagado", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Material não apagado");
      }
    });
  }

  const [sortMateriais, setSortMateriais] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredMateriais = materiais.filter(
      (material) =>
        material.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.material.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortMateriais(filteredMateriais);
  }, [materiais, searchQuery]);

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
      <h1>Materiais</h1>
      <AdicionarMaterial />
      <ArrowClockwise
        size={28}
        weight="light"
        onClick={__refresh}
        cursor="pointer"
        className={classes.iconRefresh}
      />
      <div className={classes.filterBarMateriais}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${classes.filterBarMaterialItem} ${classes.searchBarMateriais}`}
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
            <th key="id">
              MATERIAL ID
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="material">
              MATERIAL
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="estado">
              ESTADO
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="stock">
              STOCK
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="quantidade">
              QUANTIDADE
              <CaretUpDown size={16} weight="fill" style={arrowSort} />
            </th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortMateriais.map((material) => (
            <tr key={material.id}>
              <td className={classes.highlightText}>
                <span>{material.id}</span>
              </td>
              <td className={classes.highlightText}>
                <span>{material.material}</span>
              </td>
              <td className={classes.highlightText}>
                <span
                  className={`${classes.filterBarMaterialItem} ${
                    material.stock > 50
                      ? classes.verde
                      : material.stock <= 50 && material.stock > 25
                      ? classes.amarelo
                      : classes.vermelho
                  }`}
                >
                  {}
                </span>
              </td>
              <td className={classes.highlightText}>
                <span>{material.stock}</span>
              </td>
              <td className={classes.highlightText}>
                <span>{material.quantidade}</span>
              </td>
              <td>
                <span>
                  <Link
                    style={{ color: "black" }}
                    to={`/materiais/${material.id}`}
                  >
                    <ReadCvLogo size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link style={{ color: "black" }} to={`/materiais/editar`}>
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
export default MateriaisList;
