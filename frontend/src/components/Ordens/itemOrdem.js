import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import swal from "sweetalert";
import { Pencil, Trash, CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "./itemOrdem.css";

function OrdemItem({ ordem }) {
  const backgroundColor =
    ordem.estado === "EM ATRASO"
      ? "#F58283"
      : ordem.estado === "CONCLUÍDO"
      ? "#70CC7A"
      : "#FFF";

  const color = ordem.estado === "EM ATRASO" ? "white" : "black";

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
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const submit = () => {};
  return (
    <>
      <CaretLeft style={{ cursor: "pointer" }} size={25} onClick={GoBack} />
      <p>{}</p>
      <div className="headerItemOrdem">
        <h2>
          Ordem de Produção: {ordem.id}{" "}
          <Link /* to="editar" */>
            <Pencil size={25} weight="light" />
          </Link>
          &nbsp;
          <Link /* onClick={startDeleteHandler} */>
            <Trash size={25} weight="light" />
          </Link>
        </h2>
        <h5 className="barPrioridadeEstado">Prioridade: {ordem.prioridade}</h5>
        <h5
          style={{ backgroundColor, color }}
          className="barPrioridadeEstado barEstado"
        >
          {ordem.estado}
        </h5>
      </div>
      <p>{}</p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>QUANTIDADE</th>
            <th>LIBERADO</th>
            <th>DATA ENTREGA</th>
            <th>PRODUTO</th>
            <th>PRIORIDADE</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ordem.quantidade}</td>
            <td>{ordem.liberado}</td>
            <td>{ordem.data_entrega}</td>
            <td>{ordem.produto}</td>
            <td>{ordem.prioridade}</td>
            <td>{ordem.estado}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default OrdemItem;
