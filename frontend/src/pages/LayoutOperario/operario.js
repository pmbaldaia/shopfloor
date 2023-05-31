import React, { useState, useEffect } from "react";
import classes from "./operario.module.css";
import { SignOut } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";
import { useSelector } from "react-redux";
import HiUser from "../../components/SideBar/hiUser";
import { User } from "@phosphor-icons/react";
import { getTarefas } from "../../axios/tarefas";
import jwt_decode from "jwt-decode";

function Content({ cardsData }) {
  const user = useSelector((state) => state.user);
  const [tarefas, setTarefas] = useState([]);
  const [mostrarTarefas, setMostrarTarefas] = useState(false); // Variável de estado para controlar a exibição das tarefas
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const operario_associado = decoded.user.nome;

  useEffect(() => {
    fetchTarefas();
  }, []);

  async function fetchTarefas() {
    try {
      const res = await getTarefas(user.access_token);
      const tarefasData = res.data.tarefas.filter(
        (tarefa) =>
          tarefa.operario_associado &&
          tarefa.operario_associado.includes(operario_associado)
      );

      console.log(tarefasData);

      setTarefas(tarefasData);
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
  };

  const handleClickTarefas = () => {
    fetchTarefas();
    setMostrarTarefas(true);
  };

  return (
    <div className={`list-group ${classes.cardList}`}>
      {cardsData.map((card, index) => (
        <div
          key={index}
          className={`${classes["list-group-item"]} ${classes.spacingCard}`}
        >
          <div className={classes.cardContent}>
            <h5 className={`${classes["card-title"]} ${classes.cardTitle}`}>
              {card.title}
            </h5>
          </div>
        </div>
      ))}
      <div
        className={`${classes["list-group-item"]} ${classes.spacingCard}`}
        onClick={handleClickTarefas}
      >
        <div className={classes.cardContent}>
          <h5 className={`${classes["card-title"]} ${classes.cardTitle}`}>
            <span onClick={handleLogout} className={classes.logout}>
              <SignOut size={30} style={{ paddingRight: "0.2em" }} />
              TERMINAR SESSÃO
            </span>
          </h5>
        </div>
      </div>
      {mostrarTarefas && (
        <div>
          {tarefas.map((tarefa, index) => (
            <div key={index} className={classes.tarefa}>
              <p>{tarefa.nome}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OperarioLayout() {
  const cardsData = [
    {
      title: "TAREFAS",
    },
  ];

  return (
    <div className={`container ${classes.operarioLayout}`}>
      <div className={classes.header}>
        <div className={classes.headerContent}>
          <h5>
            Olá <User size={22} /> <HiUser />
          </h5>
        </div>
      </div>

      <Content cardsData={cardsData} />
    </div>
  );
}

export default OperarioLayout;
