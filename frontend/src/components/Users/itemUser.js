import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Pencil, Trash } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";

function UserItem({ user }) {
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>USER ID</th>
            <th>NOME</th>
            <th>TIPO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.tarefa}</td>
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

export default UserItem;
