import React, { useState, useEffect } from "react";
import classes from "./menu.module.css";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { Link } from "react-router-dom";
import HiUserOperario from "../../components/EcraOperario/hiUserOperario";
import { Col, Row } from "react-bootstrap";
import {
  User,
  GearFine,
  SignOut,
  ListDashes,
  Gear,
} from "@phosphor-icons/react";
import OperariosTarefas from "../../components/EcraOperario/Tarefas/tarefas";
import OperariosMaquinas from "../../components/EcraOperario/Maquinas/maquinas";
import OperariosDefinicoes from "../../components/EcraOperario/Definicoes/definicoes";
import image from "../../assets/images/riopele-digital/logo-rd.png";

function Content({ cardsData }) {
  const colors = ["#3A5A4025", "#DAD7CD75"];
  const handleCardClick = (onClick) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`list-group ${classes.cardList}`}>
      <Row>
        {cardsData.map((card, index) => (
          <Col key={index} lg={6}>
            <div
              className={`${classes["list-group-item"]} ${classes.spacingCard}`}
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                borderRadius: "1em",
              }}
              onClick={() => handleCardClick(card.onClick)} // Handle click event
            >
              {card.to ? (
                <Link to={card.to} className={classes.cardLink}>
                  <div className={classes.cardContent}>
                    <h5
                      className={`${classes["card-title"]} ${classes.cardTitle}`}
                    >
                      {card.icon}
                      {card.title}
                    </h5>
                  </div>
                </Link>
              ) : (
                <div className={classes.cardLink}>
                  <div className={classes.cardContent}>
                    <h5
                      className={`${classes["card-title"]} ${classes.cardTitle}`}
                    >
                      {card.icon}
                      {card.title}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function OperarioLayout() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const optionsData = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDateTime.toLocaleDateString(
    "pt-pt",
    optionsData
  );
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: false };
  const formattedTime = currentDateTime.toLocaleTimeString(
    "pt-pt",
    optionsTime
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
  };

  const cardsData = [
    {
      icon: <ListDashes size={28} />,
      title: "TAREFAS",
      to: "/operarios/tarefas",
      component: <OperariosTarefas />,
    },
    {
      icon: <GearFine size={28} />,
      title: "MÁQUINAS",
      to: "/operarios/maquinas",
      component: <OperariosMaquinas />,
    },
    {
      icon: <Gear size={28} />,
      title: "DEFINIÇÕES",
      to: "/operarios/definicoes",
      component: <OperariosDefinicoes />,
    },
    {
      icon: <SignOut size={28} />,
      title: "TERMINAR SESSÃO",
      onClick: handleLogout,
    },
  ];
  const today = new Date();
  return (
    <div className={classes.contentMenuOperario}>
      <Row className={classes.header}>
        <span>
          <User size={40} /> <HiUserOperario />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
      </Row>
      <Row className={classes.contentMenu}>
        <Content cardsData={cardsData} />
      </Row>
      <Row className={classes.footer}>
        <img
          src={image}
          style={{ width: "auto", height: "1.5em" }}
          alt="logoFooter"
        />
        <div className={classes.textFooter}>
          <p>
            Powered by <span>Riopele Digital</span>
          </p>
          <span>
            © 2015-{today.getFullYear()} <span>Riopele Group</span>. All rights
            reserved.
          </span>
        </div>
      </Row>
    </div>
  );
}

export default OperarioLayout;
