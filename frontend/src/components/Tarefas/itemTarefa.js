import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import BotaoVoltar from "../Botoes/Voltar";

function TarefaItem({ tarefa }) {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BotaoVoltar onClick={() => GoBack} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TAREFA ID</th>
            <th>PRODUTO</th>
            <th>OPERAÇÃO</th>
            <th>ESTADO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tarefa.id}</td>
            <td>{tarefa.produto}</td>
            <td>{tarefa.operacao}</td>
            <td>{tarefa.estado}</td>
            <td>
              <span>
                <Link to="editar">
                  <Pencil size={28} weight="light" />
                </Link>
                &nbsp; &nbsp;
                <Link>
                  <Trash size={28} weight="light" />
                </Link>
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TarefaItem;
