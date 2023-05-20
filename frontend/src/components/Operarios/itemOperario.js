import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";

function OperarioItem({ operario }) {
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>OPERÁRIO ID</th>
            <th>NOME</th>
            <th>TAREFA</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{operario.id}</td>
            <td>{operario.nome}</td>
            <td>{operario.tarefa}</td>
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

export default OperarioItem;
