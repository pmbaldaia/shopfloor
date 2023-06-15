import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button, Tabs, Tab, Table } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formOrdem.module.css";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt";
import { getCategorias } from "../../axios/categorias";
import { useSelector } from "react-redux";
/* import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; */

const NewOrdem = (props) => {
  const ButtonStyle = {
    backgroundColor: "#dad7cd",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "16em",
    height: "3em",
    marginTop: "1em",
    marginRight: "2em",
    float: "right",
    border: "none",
    outlineStyle: "none",
    outlineColor: "none",
  };

  const ButtonStyleVoltar = {
    backgroundColor: "transparent",
    color: "#3a5a40",
    fontSize: "14px",
    fontWeight: "600",
    width: "16em",
    height: "3em",
    marginTop: "1em",
    marginRight: "2em",
    float: "right",
    border: "1px solid #dad7cd",
    textDecoration: "underline",
  };
  const [liberadoDate, setLiberadoDate] = useState(null);
  const [primeiroConsumoDate, setPrimeiroConsumoDate] = useState(null);
  const [ultimoConsumoDate, setUltimoConsumoDate] = useState(null);
  const [entradaTecidoDate, setEntradaTecidoDate] = useState(null);
  const [entradaPedidoCompraDate, setEntradaPedidoCompraDate] = useState(null);
  const [previstaAcessoriosDate, setPrevistaAcessoriosDate] = useState(null);
  const [aprovacaoModeloDate, setAprovacaoModeloDate] = useState(null);
  const [desejadaRemessaDate, setDesejadaRemessaDate] = useState(null);
  const [previstaProducaoDate, setPrevistaProducaoDate] = useState(null);

  const handleLiberadoDateChange = (date) => {
    setLiberadoDate(date);
  };

  const handlePrimeiroConsumoDateChange = (date) => {
    setPrimeiroConsumoDate(date);
  };

  const handleUltimoConsumoDateChange = (date) => {
    setUltimoConsumoDate(date);
  };

  const handleEntradaTecidoDateChange = (date) => {
    setEntradaTecidoDate(date);
  };
  const handleEntradaPedidoCompraDateChange = (date) => {
    setEntradaPedidoCompraDate(date);
  };
  const handlePrevistaAcessoriosDateChange = (date) => {
    setPrevistaAcessoriosDate(date);
  };
  const handleAprovacaoModeloDateChange = (date) => {
    setAprovacaoModeloDate(date);
  };
  const handleDesejadaRemessaDateChange = (date) => {
    setDesejadaRemessaDate(date);
  };
  const handlePrevistaProducaoDateChange = (date) => {
    setPrevistaProducaoDate(date);
  };

  const [activeTab, setActiveTab] = useState("home");
  const handleAvancar = () => {
    setActiveTab(activeTab === "home" ? "tarefas" : "operarios");
  };
  const handleVoltar = () => {
    setActiveTab(activeTab === "operarios" ? "tarefas" : "home");
  };
  const [tipo, setTipo] = useState("");

  const user = useSelector((state) => state.user);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    fetchCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchCategorias() {
    try {
      const res = await getCategorias(user.access_token);
      const categorias = res.data.categorias;
      console.log(categorias);
      setCategorias(categorias);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.handleOpenModal(false)}
    >
      <Col className="d-flex align-items-center justify-content-between">
        <h1 className={classes.titulosForm}>Nova Ordem</h1>
        <X
          size={32}
          onClick={() => props.handleOpenModal(false)}
          style={{ cursor: "pointer" }}
        />
      </Col>
      <p></p>
      <Tabs defaultActiveKey="home" activeKey={activeTab}>
        <Tab
          eventKey="home"
          title={
            <span
              className={`${classes.tabColor} ${
                activeTab === "home" ? classes.activeTab : ""
              }`}
            >
              Dados
            </span>
          }
          style={{
            borderBottom: "0px solid transparent",
            border: "0px solid transparent",
          }}
        >
          <Container fluid className={classes.Container}>
            <Row>
              <Row className={classes.primeiraLinha}>
                <Col lg={2}>
                  <span className={classes.subtitulosForm}>Produto</span>
                </Col>
                <Col>
                  <input placeholder="Ordem de Produção" required></input>
                </Col>
                <Col>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="" disabled>
                      Tipo
                    </option>
                    <option value="JP01">JP01</option>
                    <option value="JP02">JP02</option>
                  </select>
                  <a
                    href="/tipo"
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      fontSize: "13px",
                    }}
                  >
                    Criar Tipo
                  </a>
                </Col>
                <Col>
                  <input placeholder="SAP" required></input>
                </Col>
                <Col>
                  <input placeholder="Txt Breve Material" required></input>
                </Col>
                <p></p>
                <Col lg={2}>
                  <span></span>
                </Col>
                <Col>
                  <select
                    value={categoriaSelecionada}
                    onChange={(e) => {
                      setCategoriaSelecionada(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      Categoria
                    </option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.categoria}
                      </option>
                    ))}
                  </select>
                  <a
                    href="/categorias"
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      fontSize: "13px",
                    }}
                  >
                    Criar Categoria
                  </a>
                </Col>
                <Col>
                  <input placeholder="Ordem de Venda" required></input>
                </Col>
                <Col>
                  <input placeholder="Estação" required></input>
                </Col>
                <Col>
                  <input placeholder="Nome do Cliente" required></input>
                </Col>
                <p></p>
                <Col lg={2}>
                  <span></span>
                </Col>{" "}
                <Col>
                  <input placeholder="Qtd Ordem" required></input>
                </Col>
                <Col>
                  <input placeholder="Qtd Forn." required></input>
                </Col>
                <Col>
                  <input placeholder="Qtd Exp." required></input>
                </Col>
                <Col>
                  <input placeholder="Nome Confeção" required></input>
                </Col>
                <p></p>
                <Col lg={2}>
                  <span></span>
                </Col>{" "}
                <Col>
                  <input placeholder="Nome Tecido" required></input>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <hr
                style={{
                  padding: "10px 0",
                  marginBottom: "20px",
                  border: "none",
                  borderTop: "1px solid #3a5a40",
                }}
              />

              <Row className={classes.segundaLinha}>
                <Col lg={2}>
                  <span className={classes.subtitulosForm}>Prazos</span>
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Liberado"
                    selected={liberadoDate}
                    onChange={handleLiberadoDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="1º Consumo"
                    selected={primeiroConsumoDate}
                    onChange={handlePrimeiroConsumoDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Data de Últ. consumo"
                    selected={ultimoConsumoDate}
                    onChange={handleUltimoConsumoDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Dt Prevista Entrada Tecido"
                    selected={entradaTecidoDate}
                    onChange={handleEntradaTecidoDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <p></p>
                <Col lg={2}>
                  <span></span>
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Últ. Entrada Pedido Compra"
                    selected={entradaPedidoCompraDate}
                    onChange={handleEntradaPedidoCompraDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Data Prevista Acessórios"
                    selected={previstaAcessoriosDate}
                    onChange={handlePrevistaAcessoriosDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Data Aprovação Modelo"
                    selected={aprovacaoModeloDate}
                    onChange={handleAprovacaoModeloDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Data Desejada Remessa"
                    selected={desejadaRemessaDate}
                    onChange={handleDesejadaRemessaDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <p></p>
                <Col lg={2}>
                  <span></span>
                </Col>
                <Col>
                  <DatePicker
                    placeholderText="Data Prevista Produção"
                    selected={previstaProducaoDate}
                    onChange={handlePrevistaProducaoDateChange}
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
                <Col>
                  <span></span>
                </Col>
                <Col>
                  <span></span>
                </Col>
                <Col>
                  <span></span>
                </Col>
              </Row>
              <hr
                style={{
                  padding: "10px 0",
                  marginBottom: "20px",
                  border: "none",
                  borderTop: "1px solid #3a5a40",
                }}
              />
              <Row className={classes.terceiraLinha}>
                <Col lg={2}>
                  <span className={classes.subtitulosForm}>Observações</span>
                </Col>
                <Col lg={10}>
                  <input className={classes.inputObs}></input>
                </Col>
              </Row>
            </Row>
            <Button style={ButtonStyle} onClick={handleAvancar}>
              Avançar
            </Button>{" "}
          </Container>
        </Tab>
        <Tab
          eventKey="tarefas"
          title={
            <span
              className={`${classes.tabColor} ${
                activeTab === "tarefas" ? classes.activeTab : ""
              }`}
            >
              Tarefas
            </span>
          }
        >
          <Container fluid>
            <Row className={classes.headerContent}>
              <Col lg={5} style={{ textAlign: "start" }}>
                <label style={{ marginRight: "0.5em" }}>Categoria:</label>
                <select
                  value={categoriaSelecionada}
                  onChange={(e) => {
                    setCategoriaSelecionada(e.target.value);
                  }}
                  style={{ width: "15em" }}
                >
                  <option value="" disabled selected>
                    -
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.categoria}
                    </option>
                  ))}
                </select>
              </Col>
              <Col lg={2}></Col>
              <Col lg={5}>
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    value={categoria.id}
                    className={classes.buttonTarefasSelecionadas}
                  >
                    {categoria.categoria}
                  </button>
                ))}
              </Col>
            </Row>
            <Row lg={12} style={{ padding: "1em" }}>
              <Col xs={5}>
                <span className={classes.titulosNovaOrdem}>
                  Tarefas a selecionar
                </span>

                <div
                  className={`${classes.firstContainer} ${classes.scrollContainer}`}
                >
                  <Table
                    bordered
                    className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
                    style={{ color: "#120309" }}
                  >
                    <tbody>
                      {categoriaSelecionada &&
                        categorias
                          .find(
                            (categoria) => categoria.id === categoriaSelecionada
                          )
                          .tarefas.map((tarefa) => (
                            <tr key={tarefa.id}>
                              <td className={classes.CategoriasBorda}>
                                {tarefa.operacao}
                              </td>
                              <td className={classes.CategoriasBorda}>
                                {tarefa.tarefa}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col xs={2} className={classes.middleContainer}>
                <div className={classes.secondContainer}>
                  <button className={classes.buttonContainer}>{">"}</button>
                  <button className={classes.buttonContainer}>{">>"}</button>
                  <button className={classes.buttonContainer}>{"<"}</button>
                  <button className={classes.buttonContainer}>{"<<"}</button>
                </div>
              </Col>
              <Col xs={5}>
                <span className={classes.titulosNovaOrdem}>
                  Tarefas selecionadas
                </span>
                <div className={classes.thirdContainer}>3</div>
              </Col>
            </Row>

            <div className={classes.Container}>
              <Button style={ButtonStyle} onClick={handleAvancar}>
                Avançar
              </Button>{" "}
              <Button style={ButtonStyleVoltar} onClick={handleVoltar}>
                Voltar
              </Button>
            </div>
          </Container>
        </Tab>
        <Tab
          eventKey="operarios"
          title={
            <span
              className={`${classes.tabColor} ${
                activeTab === "operarios" ? classes.activeTab : ""
              }`}
            >
              Operários
            </span>
          }
        >
          <Container fluid className={classes.Container}>
            <Button style={ButtonStyle}>Adicionar Ordem</Button>{" "}
            <Button style={ButtonStyleVoltar} onClick={handleVoltar}>
              Voltar
            </Button>
          </Container>
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default NewOrdem;
