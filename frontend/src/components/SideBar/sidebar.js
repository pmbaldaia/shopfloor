import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import logo from "../../assets/images/logoverde.png";
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
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

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

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
          <User size={50} />
          <p style={{ fontFamily: "Montserrat", color: "#3a5a40" }}>Olá</p>
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
      <div
        className="sidebar__menu__item"
        style={{ cursor: "pointer" }}
        onClick={openModal}
      >
        <div className="sidebar__menu__item__icon">
          <Info size={25} />
        </div>
        <div className="sidebar__menu__item__text">Sobre</div>
      </div>
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Informações</ModalHeader>
        <ModalBody>
          <p>Conteúdo do modal...</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
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
