import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation /* , useRouteLoaderData  */,
} from "react-router-dom";
import "./sidebar.scss";
import logo from "../../assets/images/logoverde.png";
import {
  Gauge,
  List,
  Users,
  Wrench,
  Info,
  SignOut,
  User,
  Needle,
} from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <Gauge size={25} />,
    to: "/dashboard",
    section: "dashboard",
  },
  {
    display: "Ordens",
    icon: <List size={25} />,
    to: "/ordens",
    section: "ordens",
  },
  {
    display: "Operários",
    icon: <Users size={25} />,
    to: "/operarios",
    section: "operarios",
  },
  {
    display: "Maquinas",
    icon: <Wrench size={25} />,
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

const sidebarNavFooter = [
  {
    display: "Sobre",
    icon: <Info size={25} />,
    to: "/sobre",
    section: "sobre",
  },
  /* {
    display: "Terminar Sessão",
    icon: <SignOut size={25} />,
    action: "/logout",
    method: "post",
    section: "",
  }, */
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

  /* const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }; */
  /* const token = useRouteLoaderData("root"); */
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
        {sidebarNavFooter.map((item, index) => (
          <Link to={item.to} key={index} style={{ textDecoration: "none" }}>
            {/* Código para rever */}
            <div
              className={`sidebar__menu__item ${
                activeIndex === "sobre" ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div
        /* className={`sidebar__menu__item ${
          activeIndex === "sobre" ? "active" : ""
        }`} */
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
