import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "./header.css";
import { Bell, MagnifyingGlass } from "@phosphor-icons/react";
import swal from "sweetalert";

function HeaderPage({ btnText, onClick }) {
  //Barra de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  
  //Modo escuro apenas no header, falta corrigir
  const [isDarkMode, setIsDarkMode] = useState("");

  const handleDarkModeToggle = (checked) => {
    setIsDarkMode(checked);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //modal notificação
  const warning = () => {
    swal("Não tem nenhuma notificação", "", "info");
  };

  return (
    <div
      className={`header-container ${isDarkMode ? "dark-mode" : " light-mode"}`}
    >
      <p>{}</p>
      <div className="header-right">
        <div className="searchBar" onSubmit={handleSearchSubmit}>
          <input
            id="searchQueryInput"
            type="text"
            name="searchQueryInput"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            <MagnifyingGlass size={24} color="#2e5a53" />
          </button>
        </div>
        <DarkModeSwitch
          className="dark-mode-toggle, toggle-icon"
          checked={isDarkMode}
          onChange={handleDarkModeToggle}
          onClick={toggleDarkMode}
          color="#2e5a53"
        />
        <Bell
          onClick={warning}
          style={{ cursor: "pointer" }}
          size={28}
          weight="light"
          className="icons"
          color="#2e5a53"
        />
      </div>
    </div>
  );
}

export default HeaderPage;
