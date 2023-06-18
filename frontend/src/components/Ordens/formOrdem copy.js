import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button, Tabs, Tab, Table } from "react-bootstrap";
import { X } from "@phosphor-icons/react";
import classes from "./formOrdem.module.css";
import DatePicker from "react-datepicker";
import pt from "date-fns/locale/pt";
import { getCategorias } from "../../axios/categorias";
import { getUsers } from "../../axios/users";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchCategorias();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchCategorias() {
    try {
      const res = await getCategorias(user.access_token);
      const categorias = res.data.categorias;
      setCategorias(categorias);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }
  async function fetchUsers() {
    try {
      const res = await getUsers(user.access_token);
      const users = res.data.users;
      setUsers(users);
      console.log(setUsers);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [userSelecionado, setUserSelecionado] = useState("");
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Arrastar e soltar dentro do mesmo container
      if (source.droppableId === categoriaSelecionada) {
        const updatedTarefasSelecionadas = Array.from(tarefasSelecionadas);
        const [tarefaMovida] = updatedTarefasSelecionadas.splice(
          source.index,
          1
        );
        updatedTarefasSelecionadas.splice(destination.index, 0, tarefaMovida);
        setTarefasSelecionadas(updatedTarefasSelecionadas);
      }
    } else {
      // Arrastar e soltar em container diferentes
      if (source.droppableId === categoriaSelecionada) {
        const sourceCategoria = categorias.find(
          (categoria) => categoria.id === source.droppableId
        );
        const destinationCategoria = categorias.find(
          (categoria) => categoria.id === destination.droppableId
        );

        if (!sourceCategoria || !destinationCategoria) {
          return; // Categorias não encontradas, cancela
        }

        const sourceTarefas = Array.from(sourceCategoria.tarefas);
        const destinationTarefas = Array.from(destinationCategoria.tarefas);

        const [tarefaMovida] = sourceTarefas.splice(source.index, 1);
        destinationTarefas.splice(destination.index, 0, tarefaMovida);

        const updatedCategorias = categorias.map((categoria) => {
          if (categoria.id === source.droppableId) {
            return {
              ...categoria,
              tarefas: sourceTarefas,
            };
          }
          if (categoria.id === destination.droppableId) {
            return {
              ...categoria,
              tarefas: destinationTarefas,
            };
          }
          return categoria;
        });

        setCategorias(updatedCategorias);

        const updatedTarefasSelecionadas = tarefasSelecionadas.filter(
          (tarefa) => tarefa.categoriaId === sourceCategoria.id
        );

        setTarefasSelecionadas(updatedTarefasSelecionadas);
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    // Find the selected category
    const selectedCategory = categorias.find(
      (categoria) => categoria.id === categoryId
    );

    if (selectedCategory) {
      // Clear the previous selected tasks
      setTarefasSelecionadas([]);

      // Add tasks from the selected category
      selectedCategory.tarefas.forEach((tarefa) => {
        setTarefasSelecionadas((prevTarefasSelecionadas) => [
          ...prevTarefasSelecionadas,
          tarefa,
        ]);
      });

      // Update the selected category
      setCategoriaSelecionada(categoryId);
    }
  };

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
                    onClick={() => handleCategoryClick(categoria.id)}
                  >
                    {categoria.categoria}
                  </button>
                ))}
              </Col>
            </Row>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Row lg={12} style={{ padding: "1em" }}>
                <Col xs={5}>
                  <span className={classes.titulosNovaOrdem}>
                    Tarefas a selecionar
                  </span>

                  <Droppable droppableId="first-container" type="tarefas">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
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
                                  (categoria) =>
                                    categoria.id === categoriaSelecionada
                                )
                                .tarefas.map((tarefa, index) => (
                                  <Draggable
                                    key={tarefa.id}
                                    draggableId={tarefa.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <tr
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <td className={classes.CategoriasBorda}>
                                          {tarefa.operacao}
                                        </td>
                                        <td className={classes.CategoriasBorda}>
                                          {tarefa.tarefa}
                                        </td>
                                      </tr>
                                    )}
                                  </Draggable>
                                ))}
                          </tbody>
                        </Table>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
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
                  <Droppable droppableId="third-container" type="tarefas">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${classes.thirdContainer} ${classes.scrollContainer}`}
                      >
                        <Table
                          bordered
                          className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
                          style={{ color: "#120309" }}
                        >
                          <tbody>
                            {tarefasSelecionadas.map((tarefa, index) => (
                              <Draggable
                                key={tarefa.id}
                                draggableId={tarefa.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <tr
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <td className={classes.CategoriasBorda}>
                                        {tarefa.operacao}
                                      </td>
                                      <td className={classes.CategoriasBorda}>
                                        {tarefa.tarefa}
                                      </td>
                                    </tr>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </tbody>
                        </Table>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
              </Row>
            </DragDropContext>

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
            <Row className={classes.headerContent}>
              <Col lg={5} style={{ textAlign: "start" }}>
                <label style={{ marginRight: "0.5em" }}>Operários:</label>
                <select
                  value={userSelecionado}
                  onChange={(e) => {
                    setUserSelecionado(e.target.value);
                  }}
                  style={{ width: "15em" }}
                >
                  <option value="" disabled selected>
                    -
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nome}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Row lg={12} style={{ padding: "1em" }}>
                <Col xs={5}>
                  <span className={classes.titulosNovaOrdem}>
                    Operários a selecionar
                  </span>

                  <Droppable droppableId="first-container" type="tarefas">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${classes.firstContainer} ${classes.scrollContainer}`}
                      >
                        <Table
                          bordered
                          className={`${classes["table-bordered"]} ${classes.tableSpacing}`}
                          style={{ color: "#120309" }}
                        >
                          <tbody>
                            {userSelecionado &&
                              users
                                .find((user) => user.id === userSelecionado)
                                .user.map((user, index) => (
                                  <Draggable
                                    key={user.id}
                                    draggableId={user.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <tr
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <td className={classes.CategoriasBorda}>
                                          {user.nome}
                                        </td>
                                        <td className={classes.CategoriasBorda}>
                                          {user.especialidade}
                                        </td>
                                      </tr>
                                    )}
                                  </Draggable>
                                ))}
                          </tbody>
                        </Table>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
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
                    Operários selecionados
                  </span>
                  <Droppable droppableId="third-container" type="tarefas">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.thirdContainer}
                      >
                        {tarefasSelecionadas.map((tarefa, index) => (
                          <Draggable
                            key={tarefa.id}
                            draggableId={tarefa.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={classes.selectedTask}
                              >
                                {tarefa.tarefa}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
              </Row>
            </DragDropContext>

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
      </Tabs>
    </Modal>
  );
};

export default NewOrdem;
