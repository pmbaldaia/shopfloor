import React, { useState /* useContext */ } from "react";
/* import { DarkModeSwitch } from "react-toggle-dark-mode"; */
import "./header.css";
import { Bell, MagnifyingGlass, CaretLeft } from "@phosphor-icons/react";
import swal from "sweetalert";
/* import { ThemeContext } from "../../themeContext"; */

function HeaderPage() {
  //Barra de pesquisa
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  /* const { theme, toggleTheme } = useContext(ThemeContext); */

  /* const handleThemeToggle = () => {
    toggleTheme();
  }; */

  //modal notificação
  const warning = () => {
    swal("Não tem nenhuma notificação", "", "info");
  };

  return (
    <div
      className="header-container" /* className={`header-container ${theme}`} */
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
            <MagnifyingGlass size={25} color="#2e5a53" />
          </button>
        </div>
        {/*  <DarkModeSwitch
          className="dark-mode-toggle, toggle-icon"
          checked={theme === "light"}
          onChange={handleThemeToggle}
          color="#2e5a53"
        /> */}
        <Bell
          onClick={warning}
          style={{ cursor: "pointer" }}
          size={25}
          weight="light"
          className="icons"
          color="#2e5a53"
        />
      </div>
    </div>
  );
}

export default HeaderPage;
