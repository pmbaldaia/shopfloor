import { Link /* useRouteLoaderData, */ } from "react-router-dom";
import { Table } from "react-bootstrap";

function OperarioItem({ operario }) {
  /* const token = useRouteLoaderData("root"); */

  return (
    <>
      <Table
        striped
        bordered
        hover
        style={{ width: "75rem", marginLeft: "18rem" }}
      >
        <thead>
          <tr>
            <th>OPERARIO</th>
            <th>NOME</th>
            <th>TAREFAS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{operario.id}</td>
            <td>{operario.nome_func}</td>
            <td>{operario.tarefa}</td>
          </tr>
        </tbody>
        {/* {token && ( */}
        <menu>
          <Link to="editar">Editar</Link>
          <button>Apagar</button>
        </menu>
        {/* )} */}
      </Table>
    </>
  );
}

export default OperarioItem;
