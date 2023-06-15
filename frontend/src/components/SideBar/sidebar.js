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
  Sliders,
  ListDashes,
  Stack,
  SunHorizon,
  CaretDown,
  CaretUp,
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
    to: "/users",
    section: "users",
  },
  {
    display: "Máquinas",
    icon: <GearFine size={25} />,
    to: "/maquinas",
    section: "maquinas",
  },
  {
    display: "Manutenção",
    icon: <Sliders size={25} />,
    section: "manutencao",
    submenu: [
      {
        display: "Categorias",
        icon: <Stack size={25} />,
        to: "/manutencao/categorias",
      },
      {
        display: "Tipos",
        icon: <SunHorizon size={25} />,
        to: "/manutencao/tipos",
      },
    ],
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeSubmenu, setActiveSubmenu] = useState(1);
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

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

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
  /* const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); */
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
  if (shouldRedirect) {
    return window.location.replace("/login");
  }

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar__logo">
        <Link to="/dashboard">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div className="avatar">
          <Link to="/dashboard">
            <User size={50} />
          </Link>
          <HiUser />
        </div>
        <br></br>
        {sidebarNavItems.map((item, index) => (
          <div key={item.section}>
            <Link to={item.to} style={{ textDecoration: "none" }}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => {
                  if (item.submenu) {
                    setActiveSubmenu((prevSubmenu) =>
                      prevSubmenu === index ? null : index
                    );
                  }
                }}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
                {item.submenu && (
                  <div className="submenu-icon">
                    {activeSubmenu === index ? (
                      <CaretUp size={18} />
                    ) : (
                      <CaretDown size={18} />
                    )}
                  </div>
                )}
              </div>
            </Link>
            {item.submenu && activeSubmenu === index && (
              <div className="sidebar__submenu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <Link
                    to={submenuItem.to}
                    key={subIndex}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className={`sidebar__submenu__item ${
                        activeSubmenu === subIndex ? "active" : ""
                      }`}
                    >
                      <div className="sidebar__submenu__item__icon">
                        {submenuItem.icon}
                      </div>
                      <div className="sidebar__submenu__item__text">
                        {submenuItem.display}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
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
      <div
        onClick={handleOpenModal}
        className="sidebar__menu__item"
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar__menu__item__icon">
          <Info size={25} />
        </div>
        <div className="sidebar__menu__item__text">Sobre</div>
      </div>
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

      {/* Terminar Sessão */}
      <div
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(userActions.logout());
          setShouldRedirect(true);
        }}
        className="sidebar__menu__item"
        style={{ cursor: "pointer" }}
      >
        <div className="sidebar__menu__item__icon">
          <SignOut size={25} />
        </div>
        <div className="sidebar__menu__item__text">Terminar Sessão</div>
      </div>

      {/* Sidebar Collapse Button */}
      <div className="sidebar__collapse-button" onClick={handleToggleSidebar}>
        <div className="collapse-icon"></div>
      </div>
    </div>
  );
};

export default Sidebar;
