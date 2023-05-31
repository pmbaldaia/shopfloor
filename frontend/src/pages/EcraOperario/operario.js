import React, { useState, useEffect } from "react";
import classes from "./operario.module.css";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { useSelector } from "react-redux";
import HiUser from "../../components/SideBar/hiUser";
import { getTarefas } from "../../axios/tarefas";
import jwt_decode from "jwt-decode";
import { Col, Row } from "react-bootstrap";
import {
  User,
  Files,
  GearFine,
  SignOut,
  ListDashes,
  Gear,
} from "@phosphor-icons/react";

function Content({ cardsData }) {
  const user = useSelector((state) => state.user);
  const [tarefas, setTarefas] = useState([]);
  const [mostrarTarefas, setMostrarTarefas] = useState(false);
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const operario_associado = decoded.user.nome;

  const fetchTarefas = async () => {
    try {
      const res = await getTarefas(user.access_token);
      const tarefasData = res.data.tarefas.filter(
        (tarefa) =>
          tarefa.operario_associado &&
          tarefa.operario_associado.includes(operario_associado)
      );
      setTarefas(tarefasData);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
  };

  const handleClickTarefas = () => {
    fetchTarefas();
    setMostrarTarefas(true);
  };

  const colors = ["#F5828325", "#70CC7A25", "#DDE5DF25", "#A3B18A25"];

  return (
    <div className={`list-group ${classes.cardList}`}>
      <Row>
        {/* Renderiza os cardsData lado a lado */}
        {cardsData.map((card, index) => (
          <Col key={index} lg={6}>
            <div
              className={`${classes["list-group-item"]} ${classes.spacingCard}`}
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
            >
              <div className={classes.cardContent}>
                <h5 className={`${classes["card-title"]} ${classes.cardTitle}`}>
                  <span className={classes.iconsPosition}>
                    {card.icon}
                    {card.title}
                  </span>
                </h5>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Renderiza o botão "Terminar Sessão" por último */}
      <Row>
        <Col lg={6}>
          <div
            className={`${classes["list-group-item"]} ${classes.spacingCard}`}
            onClick={handleClickTarefas}
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
            }}
          >
            <div className={classes.cardContent} onClick={handleLogout}>
              <h5 className={`${classes["card-title"]} ${classes.cardTitle}`}>
                <span className={classes.logout}>
                  <SignOut size={30} style={{ paddingRight: "0.2em" }} />
                  TERMINAR SESSÃO
                </span>
              </h5>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function OperarioLayout() {
  const currentDate = new Date();
  const optionsData = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("pt-pt", optionsData);
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: false };
  const formattedTime = currentDate.toLocaleTimeString("pt-pt", optionsTime);

  const cardsData = [
    { icon: <ListDashes size={28} />, title: "TAREFAS" },
    { icon: <GearFine size={28} />, title: "MÁQUINAS" },
    { icon: <Files size={28} />, title: "ORDENS" },
    { icon: <Gear size={28} />, title: "DEFINIÇÕES" },
  ];

  return (
    <div className={classes.contentOperario}>
      <Row className={classes.header}>
        <span>
          <User size={22} /> <HiUser />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
      </Row>

      <Content cardsData={cardsData} />
    </div>
  );
}

export default OperarioLayout;
