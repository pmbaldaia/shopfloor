import React, { useState, useEffect } from "react";
import "./header.css";
import { Bell, MagnifyingGlass, CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumbs from "../BreadCrumbs/breadcrumbs";
import { getOrdens } from "../../axios/ordens";
import { getTarefas } from "../../axios/tarefas";
import { getUsers } from "../../axios/users";
import { getMaquinas } from "../../axios/maquinas";

function HeaderPage({ showCaretLeft, showSearchBar }) {
  const user = useSelector((state) => state.user);
  const [ordens, setOrdens] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [operarios, setOperarios] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (Array.isArray(ordens)) {
      const filteredOrdens = ordens.filter(
        (ordem) =>
          ordem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ordem.sap.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ordem.ordem_venda.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredTarefas = tarefas.filter((tarefa) =>
        tarefa.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredOperarios = operarios.filter((operario) =>
        operario.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredMaquinas = maquinas.filter((maquina) =>
        maquina.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const results = [
        ...filteredOrdens,
        ...filteredTarefas,
        ...filteredOperarios,
        ...filteredMaquinas,
      ];
      setSearchResults(results);
      setShowModal(results.length > 0);
    }
  };

  const warning = () => {
    alert("Não tem nenhuma notificação");
  };

  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const fetchGlobalData = async (user) => {
    try {
      const access_token = user.access_token;

      const ordensData = await getOrdens(access_token);
      const tarefasData = await getTarefas(access_token);
      const operariosData = await getUsers(access_token);
      const maquinasData = await getMaquinas(access_token);

      setOrdens(ordensData.data);
      setTarefas(tarefasData.data);
      setOperarios(operariosData.data);
      setMaquinas(maquinasData.data);
    } catch (error) {
      console.log("Erro ao buscar dados globais:", error);
    }
  };

  useEffect(() => {
    fetchGlobalData(user);
  }, [user]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    closeModal();
  }, [searchResults]);

  return (
    <div className="header-container">
      {showCaretLeft && (
        <span
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <CaretLeft
              style={{ cursor: "pointer" }}
              size={25}
              onClick={GoBack}
            />
            &nbsp;&nbsp;
            <Breadcrumbs />
          </div>
        </span>
      )}
      <p>{}</p>
      <div className="header-right">
        {showSearchBar && (
          <form className="searchBar" onSubmit={handleSearchSubmit}>
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              id="searchQuerySubmit"
              type="submit"
              name="searchQuerySubmit"
            >
              <MagnifyingGlass size={25} color="#2e5a53" />
            </button>
          </form>
        )}
        <Bell
          onClick={warning}
          style={{ cursor: "pointer" }}
          size={25}
          weight="light"
          className="icons"
          color="#2e5a53"
        />
      </div>

      {showModal && (
        <div className="modal">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.nome}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderPage;
