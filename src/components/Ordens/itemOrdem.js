import { Link, /* useRouteLoaderData, */ useSubmit } from "react-router-dom";
import { Table } from "react-bootstrap";
import swal from "sweetalert";

function OrdemItem({ ordem }) {
  /* const token = useRouteLoaderData("root"); */
  const submit = useSubmit();
  const backgroundColor =
    ordem.prioridade === "BAIXA"
      ? "yellow"
      : ordem.prioridade === "MÉDIA"
      ? "orange"
      : "red";

  const color =
    ordem.prioridade === "BAIXA"
      ? "black"
      : ordem.prioridade === "MÉDIA"
      ? "black"
      : "white";

  function startDeleteHandler() {
    swal({
      title: "Tem a certeza que quer apagar?",
      text: "Uma vez apagado, não poderá recuperá-lo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((Delete) => {
      if (Delete) {
        submit({ method: "delete" });
        swal("Ordem eliminada com sucesso", {
          icon: "success",
        });
      } else {
        swal("Ordem não apagada");
      }
    });
  }

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
            <th>ID</th>
            <th>QUANTIDADE</th>
            <th>DATA CHEGADA</th>
            <th>DATA PREVISTA ENTREGA</th>
            <th>PRODUTO</th>
            <th>PRIORIDADE</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ordem.ordem_num}</td>
            <td>{ordem.quantidade}</td>
            <td>{ordem.data_chegada}</td>
            <td>{ordem.data_prevista_entrega}</td>
            <td>{ordem.produto}</td>
            <td style={{ backgroundColor, color }}>{ordem.prioridade}</td>
            <td>{ordem.estado}</td>
          </tr>
        </tbody>
        {/* {token && ( */}
        <menu>
          <Link to="editar">Editar</Link>
          <button onClick={startDeleteHandler}>Apagar</button>
        </menu>
        {/* )} */}
      </Table>
    </>
  );
}

export default OrdemItem;
