import React from "react";
import classes from "./tarefas.module.css";
import HiUserOperario from "../hiUserOperario";
import { Row } from "react-bootstrap";
import { User } from "@phosphor-icons/react";

function tarefasOperarios() {
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

  return (
    <div className={classes.contentOperario}>
      <Row className={classes.header}>
        <span>
          <User size={40} /> <HiUserOperario />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
      </Row>
    </div>
  );
}

export default tarefasOperarios;
