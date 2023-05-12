import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import swal from "sweetalert";
import { Pencil, Trash } from "@phosphor-icons/react";

function OrdemItem({ ordem }) {
  /* const token = useRouteLoaderData("root"); */
  const submit = () => {};
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>QUANTIDADE</th>
            <th>LIBERADO</th>
            <th>DATA ENTREGA</th>
            <th>PRODUTO</th>
            <th>PRIORIDADE</th>
            <th>ESTADO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ordem.id}</td>
            <td>{ordem.quantidade}</td>
            <td>{ordem.liberado}</td>
            <td>{ordem.data_entrega}</td>
            <td>{ordem.produto}</td>
            <td style={{ backgroundColor, color }}>{ordem.prioridade}</td>
            <td>{ordem.estado}</td>
            {/* {token && ( */}
            <td>
              <span>
                <Link to="editar">
                  <Pencil size={28} weight="light" />
                </Link>
                &nbsp; &nbsp;
                <Link onClick={startDeleteHandler}>
                  <Trash size={28} weight="light" />
                </Link>
              </span>
            </td>
            {/* )} */}
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default OrdemItem;
