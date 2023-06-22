import React, { useState, useEffect } from "react";
import classes from "./tarefas.module.css";
import { Row, Col, Card } from "react-bootstrap";
import { User, HouseLine, Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import HiUserOperario from "../hiUserOperario";
import image from "../../../assets/images/riopele-digital/logo-rd.png";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function decodeToken(token) {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken;
  } catch (error) {
    console.log("Erro ao decodificar o token:", error);
    return null;
  }
}

function TarefasOperarios() {
  const user = useSelector((state) => state.user);
  const [userTarefas, setUserTarefas] = useState([]);
  const [userOrdens, setUserOrdens] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.access_token) {
        try {
          const decodedToken = decodeToken(user.access_token);
          console.log(decodedToken);

          const loggedInUser = decodedToken.user;
          console.log(loggedInUser);

          if (loggedInUser) {
            setUserTarefas(loggedInUser.tarefas_associadas || []);
            setUserOrdens(loggedInUser.ordens_atribuidas || []);
            console.log(loggedInUser.tarefas_associadas);
            console.log(loggedInUser.ordens_atribuidas);
          } else {
            setUserTarefas([]);
            setUserOrdens([]);
          }
        } catch (error) {
          console.log("Erro ao buscar informações do utilizador:", error);
          setUserTarefas([]);
          setUserOrdens([]);
        }
      } else {
        setUserTarefas([]);
        setUserOrdens([]);
      }
    };

    fetchUserData();
  }, [user]);

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
  const today = new Date();

  return (
    <div className={classes.contentOperario}>
      <Row className={classes.header}>
        <span>
          <User size={40} /> <HiUserOperario />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
        <h4 className={classes.formattedTitle}>Tarefas</h4>
      </Row>
      <Row className={classes.menuRow}>
        <Col>
          <Link to="/operarios" className={classes.menuButton}>
            <HouseLine size={32} />
          </Link>
        </Col>
      </Row>
      <div className={classes.mainContentStyle}>
        {userTarefas.length > 0 || userOrdens.length > 0 ? (
          <Col>
            {userTarefas.map((tarefa, index) => (
              <Card key={index} className={classes.cardStyle}>
                <Card.Body>
                  <Row>
                    <Col xs={4} className={classes.cardTextOrdem}>
                      <Card.Text>{userOrdens}</Card.Text>
                    </Col>
                    <Col xs={4} className={classes.cardTextTarefa}>
                      <Card.Text>{tarefa}</Card.Text>
                    </Col>
                    <Col xs={4} className={classes.cardTextQuantidade}>
                      <Card.Text>1/20</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Warning
              size={25}
              color="#F58283"
              weight="bold"
              style={{ paddingRight: "5px" }}
            />
            <label>Nenhuma tarefa ou ordem encontrada</label>
          </div>
        )}
      </div>

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
            © 2015-{today.getFullYear()} <span>Riopele Group</span>. Todos os
            direitos reservados.
          </span>
        </div>
      </Row>
    </div>
  );
}

export default TarefasOperarios;
