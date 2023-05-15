import { Link /* useRouteLoaderData, */ } from "react-router-dom";
import { Table } from "react-bootstrap";

function MaterialItem({ material }) {
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
            <th>MATERIAL ID</th>
            <th>MATERIAL</th>
            <th>STOCK</th>
            <th>QUANTIDADE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{material.id}</td>
            <td>{material.material}</td>
            <td>{material.stock}</td>
            <td>{material.quantidade}</td>
          </tr>
        </tbody>
        <menu>
          <Link to="editar">Editar</Link>
          <button>Apagar</button>
        </menu>
      </Table>
    </>
  );
}

export default MaterialItem;
