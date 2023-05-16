import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Pencil, Trash, CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "./itemOrdem.css";
import { Container, Row, Col } from "react-bootstrap";

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
          <Link onClick={startDeleteHandler}>
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
      <Container>
        <Row>
          <Col md={4}>
            <Row>
              <Col>TIPO</Col>
              <Col>{ordem.tipo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>SAP</Col>
              <Col>{ordem.sap}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Txt Breve Material</Col>
              <Col>{ordem.txt_breve_material}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>Ordem de venda</Col>
              <Col>{ordem.ordem_venda}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Estação</Col>
              <Col>{ordem.estacao}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Nome Cliente</Col>
              <Col>{ordem.nome_cliente}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>Quantidade</Col>
              <Col>{ordem.quantidade}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Quantidade Fornecida</Col>
              <Col>{ordem.quantidade_fornecida}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Quantidade Expedida </Col>
              <Col>{ordem.quantidade_experidida}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>Nome Confeção </Col>
              <Col>{ordem.nome_confecao}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Liberado </Col>
              <Col>{ordem.liberado}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Nome Tecido </Col>
              <Col>{ordem.nome_tecido}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>1º Consumo </Col>
              <Col>{ordem.primeiro_consumo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Último Consumo </Col>
              <Col>{ordem.ultimo_consumo}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Data Prevista Entrada Tecido </Col>
              <Col>{ordem.data_prevista_entrada_tecido}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>Última Entrada Pedido Compra </Col>
              <Col>{ordem.ultima_entrada_pedido_compra}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Data Prevista Acessórios </Col>
              <Col>{ordem.data_prevista_acessorios}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Data Aprovação Modelo </Col>
              <Col>{ordem.data_aprovacao_modelo}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Row>
              <Col>Data Desejada Remessa </Col>
              <Col>{ordem.data_desejada_remessa}</Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col>Data Prevista Produção </Col>
              <Col>{ordem.data_prevista_producao}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ textAlign: "justify" }}>
            Observações {ordem.observacao}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrdemItem;
