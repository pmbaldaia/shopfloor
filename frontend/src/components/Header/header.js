import React, { useState } from "react";
import "./header.css";
import { Bell, MagnifyingGlass, CaretLeft } from "@phosphor-icons/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function HeaderPage({ showCaretLeft, showSearchBar }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const warning = () => {
    swal("Não tem nenhuma notificação", "", "info");
  };

  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  return (
    <div className="header-container">
      {showCaretLeft && (
        <CaretLeft style={{ cursor: "pointer" }} size={25} onClick={GoBack} />
      )}
      <p>{}</p>
      <div className="header-right">
        {showSearchBar && (
          <div className="searchBar" onSubmit={handleSearchSubmit}>
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
          </div>
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
    </div>
  );
}

export default HeaderPage;
