import React, { useState, useEffect } from "react";
import classes from "./definicoes.module.css";
import HiUserOperario from "../hiUserOperario";
import { Row, Col } from "react-bootstrap";
import { User, HouseLine } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function TarefasOperarios() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute (60000 milliseconds)

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

  return (
    <div className={classes.contentOperario}>
      <Row className={classes.header}>
        <span>
          <User size={40} /> <HiUserOperario />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
      </Row>
      <Row className={classes.menuRow}>
        <Col>
          <Link to="/operarios" className={classes.menuButton}>
            <HouseLine size={32} />
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default TarefasOperarios;
