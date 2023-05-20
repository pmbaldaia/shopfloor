import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import HeaderPage from "../Header/header";
import { Container, Row, Col } from "react-bootstrap";
import "./itemMaquina.css";
import swal from "sweetalert";

function MaquinaItem({ maquina }) {
  const submit = () => {};

  function startDeleteHandler() {
    swal({
      title: "Tem a certeza que quer apagar?",
      text: "Uma vez apagado, não poderá recuperá-lo.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submit({ method: "delete" });
        swal("Maquina não apagada", {
          message: "Precisa de estar autenticado",
          icon: "error",
        });
      } else {
        swal("Maquina não apagada");
      }
    });
  }
  return (
    <>
      <HeaderPage showCaretLeft={true} showSearchBar={false} />
      <Container>
        <Row>
          <Col>
            <Row>
              <div>
                <div>
                  <h5>ID da máquina: {maquina.id}</h5>
                  <p>Nome: {maquina.nome}</p>
                  <img
                    src={maquina.imagem}
                    alt={maquina.nome}
                    style={{ width: "20em" }}
                  />
                  <p>Nome: {maquina.fabricante}</p>
                  <p>Data de Aquisição: {maquina.data_aquisicao}</p>
                  <p>Última Manutenção: {maquina.ultima_manutencao}</p>
                  <p>Próxima Manutenção: {maquina.proxima_manutencao}</p>
                  <p>Tipo: {maquina.tipo}</p>
                  <p>Modelo: {maquina.modelo}</p>
                  <p>Estado: {maquina.estado}</p>
                </div>
                <span>
                  <Link to="editar">
                    <Pencil size={28} weight="light" />
                  </Link>
                  &nbsp; &nbsp;
                  <Link>
                    <Trash
                      size={28}
                      weight="light"
                      onClick={startDeleteHandler}
                    />
                  </Link>
                </span>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MaquinaItem;
