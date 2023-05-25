import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Pencil, Trash, DownloadSimple } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import classes from "./itemTarefa.module.css";

function TarefaItem({ tarefa }) {
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <div className={classes.headerItemTarefa}>
        <h2>
          Detalhes Tarefa: {tarefa.id}{" "}
          <Link /* to="editar" */>
            <Pencil size={25} weight="light" />
          </Link>
          &nbsp;
          <Link /* onClick={startDeleteHandler} */>
            <Trash size={25} weight="light" />
          </Link>
          &nbsp;
          <Link>
            <DownloadSimple size={25} weight="light" />
          </Link>
        </h2>
      </div>
      <select
        id="filterTarefa"
        className={`${classes.filterBarTarefaItem} ${classes.filterTarefa}`}
        /*   value={selectedFilterEstado}
        onChange={handleFilterEstadoChange} */
      >
        <option
          value=""
          selected
          disabled
          hidden
          style={{ color: "rgba(255, 0, 0, 0.5)" }}
        >
          Estado
        </option>
        <option value="">Todas</option>
        <option value="Em Atraso">Em atraso</option>
        <option value="Pendente">Pendente</option>
        <option value="Concluído">Concluído</option>
        <option value="Em Progresso">Em progresso</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OPERAÇÃO</th>
            <th>TAREFA</th>
            {/* 
            <th>AÇÕES</th> */}
          </tr>
        </thead>
        {tarefa.subtarefas.map((subtarefa, index) => (
          <tbody>
            <tr key={index}>
              <td>{subtarefa.operacao}</td>
              <td>{subtarefa.tarefa}</td>
              {/* <td>
                <span>
                  <Link to="editar">
                    <Pencil size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link>
                    <Trash size={28} weight="light" />
                  </Link>
                </span>
              </td> */}
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
}

export default TarefaItem;
