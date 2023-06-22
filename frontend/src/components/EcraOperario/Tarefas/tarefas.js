import React, { useState, useEffect } from "react";
import classes from "./tarefas.module.css";
import { Row, Col } from "react-bootstrap";
import { User, HouseLine, Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import HiUserOperario from "../hiUserOperario";
import image from "../../../assets/images/riopele-digital/logo-rd.png";
import { getUsers } from "../../../axios/users";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function TarefasOperarios() {
  const user = useSelector((state) => state.user);
  const [userTarefas, setUserTarefas] = useState([]);

  useEffect(() => {
    if (user && user.access_token) {
      fetchUserTarefas();
    }
  }, [user]);

  function decodeToken(token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.log("Erro ao decodificar o token:", error);
      return null;
    }
  }

  async function fetchUserTarefas() {
    try {
      const decodedToken = decodeToken(user.access_token);
      console.log(decodedToken);

      if (decodedToken) {
        const res = await getUsers(decodedToken); // Pass the decoded token instead of the access_token
        const users = res.data.users;
        const loggedInUser = users.find(
          (u) => u.accessToken === user.access_token
        );

        console.log(loggedInUser);

        if (loggedInUser) {
          const userTarefas = loggedInUser.user.tarefas_associadas;
          console.log(userTarefas);
          setUserTarefas(userTarefas);
        } else {
          console.log("Usuário não encontrado.");
          setUserTarefas([]);
        }
      } else {
        console.log("Token inválido ou expirado.");
        setUserTarefas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  }

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
  const today = new Date();
  const mainContentStyle = {
    padding: "1em",
  };

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
      <div style={mainContentStyle}>
        {userTarefas.length > 0 ? (
          userTarefas.map((tarefa) => (
            <div key={tarefa.id}>
              <p>{tarefa.nome}</p>
              <p>{tarefa.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
        <Warning size={32} color="#F58283" weight="bold" />
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
