import React, { useState, useEffect } from "react";
import classes from "./maquinas.module.css";
import HiUserOperario from "../hiUserOperario";
import { getMaquinas } from "../../../axios/maquinas";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { User, HouseLine, Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/riopele-digital/logo-rd.png";
import AdicionarProblema from "../../Botoes/EcraOperario/AdicionarProblema";
function TarefasOperarios() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const user = useSelector((state) => state.user);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetchMaquinas(); // eslint-disable-next-line
  }, [user.access_token]);

  async function fetchMaquinas() {
    try {
      const res = await getMaquinas(user.access_token);
      const machine = res.data.maquinas;
      setMaquinas(machine);
    } catch (error) {
      console.error("Erro ao buscar as maquinas:", error);
    }
  }

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
  const today = new Date();
  return (
    <div className={classes.contentOperario}>
      <Row className={classes.header}>
        <span>
          <User size={40} /> <HiUserOperario />
        </span>
        <p className={classes.formattedDate}>{formattedDate}</p>
        <p className={classes.formattedTime}>{formattedTime}</p>
        <h4 className={classes.formattedTitle}>Máquinas</h4>
      </Row>
      <Row className={classes.menuRow}>
        <Col>
          <Link to="/operarios" className={classes.menuButton}>
            <HouseLine size={32} />
          </Link>
        </Col>
      </Row>{" "}
      <div className={classes.textoInicial}>
        <label>Adicione o problema que a máquina tenha</label>
      </div>
      <div className={classes.mainContentStyle}>
        {maquinas.length > 0 ? (
          <Col>
            {maquinas.map((maquina, index) => (
              <Card key={index} className={classes.cardStyle}>
                <Card.Body>
                  <Row>
                    <Col xs={6} className={classes.cardTextMaquinaNome}>
                      <Card.Img
                        src={maquina.imagem}
                        className={classes.cardImages}
                      />
                      <Card.Text>{maquina.nome}</Card.Text>
                    </Col>
                    <Col xs={6}>
                      <AdicionarProblema />
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
            © 2015-{today.getFullYear()} <span>Riopele Group</span>. All rights
            reserved.
          </span>
        </div>
      </Row>
    </div>
  );
}

export default TarefasOperarios;
