import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import logo from "../../assets/images/logoverde.png";
import logoModal from "../../assets/images/riopele-digital/logo-rd.png";
import {
  ChartLine,
  Files,
  Users,
  GearFine,
  Info,
  SignOut,
  User,
  Needle,
  ListDashes,
} from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import Modal from "react-modal";
import HiUser from "./hiUser";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <ChartLine size={25} />,
    to: "/dashboard",
    section: "dashboard",
  },
  {
    display: "Ordens",
    icon: <Files size={25} />,
    to: "/ordens",
    section: "ordens",
  },
  {
    display: "Tarefas",
    icon: <ListDashes size={25} />,
    to: "/tarefas",
    section: "tarefas",
  },
  {
    display: "Operários",
    icon: <Users size={25} />,
    to: "/operarios",
    section: "operarios",
  },
  {
    display: "Maquinas",
    icon: <GearFine size={25} />,
    to: "/maquinas",
    section: "maquinas",
  },
  {
    display: "Materiais",
    icon: <Needle size={25} />,
    to: "/materiais",
    section: "materiais",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const today = new Date();

  const closeModal = {
    backgroundColor: "#dad7cd",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "12em",
    height: "3em",
    marginTop: "2em",
    border: "none",
    borderRadius: "9px",
    outlineStyle: "none",
    outlineColor: "none",
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/dashboard">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div
        ref={sidebarRef}
        className={`sidebar__menu ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="avatar">
          {/* <User size={50} />
          <p style={{ fontFamily: "Montserrat", color: "#3a5a40" }}>Olá</p> */}
          <User size={50} />
          <HiUser />
        </div>
        <br></br>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index} style={{ textDecoration: "none" }}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}

        <hr
          style={{
            width: "180px",
            marginTop: "7em",
            marginLeft: "1.5em",
          }}
        ></hr>
      </div>
      {/* Modal Sobre */}
      <Link
        to="#sobre"
        onClick={handleOpenModal}
        className="sidebar__menu__item"
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar__menu__item__icon">
          <Info size={25} />
        </div>
        <div className="sidebar__menu__item__text">Sobre</div>
      </Link>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Sobre"
        className="custom-modal shadow-lg"
      >
        <img
          src={logoModal}
          alt="logoModal"
          style={{ width: "auto", height: "2.5em" }}
        />
        <p className="footerUp">
          Powered by <span className="modalRiopele">Riopele Digital</span>
        </p>
        <footer className="footerDown">
          © 2015-{today.getFullYear()}{" "}
          <span className="modalRiopele">Riopele Group</span>. All rights
          reserved.
        </footer>
        <button style={closeModal} onClick={handleCloseModal}>
          Fechar
        </button>
      </Modal>

      {/*Terminar Sessão */}
      <div
        className="sidebar__menu__item"
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(userActions.logout());
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar__menu__item__icon">
          <SignOut size={25} />
        </div>
        <div className="sidebar__menu__item__text">Terminar Sessão</div>
      </div>
    </div>
  );
};

export default Sidebar;
