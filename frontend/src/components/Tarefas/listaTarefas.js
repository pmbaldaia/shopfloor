import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdicionarTarefa from "../Botoes/AdicionarTarefas";
import classes from "./listaTarefas.module.css";
import { ArrowClockwise, ReadCvLogo, CaretUp, CaretDown, MagnifyingGlass, Info,} from "@phosphor-icons/react";
import HeaderPage from "../Header/header";

function TarefasList({ tarefas }) {
  /* const submit = () => {}; */

  function CorEstado({ tarefa }) {
    const estadoLowerCase = tarefa.estado.toLowerCase();
    const backgroundColor = estadoLowerCase === "em atraso" ? "#F58283" : estadoLowerCase === "concluído" ? "#70CC7A" : "#FFF";

    const color = estadoLowerCase === "em atraso" ? "white" : estadoLowerCase === "concluído" ? "white" : "black";

    return { backgroundColor, color };
  }

  const [sortTarefas, setSortTarefas] = useState([]);
  const [tarefasAssociadas, setTarefasAssociadas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterEstado, setSelectedFilterEstado] = useState("");
  const [selectedFilterPrioridade, setSelectedFilterPrioridade] = useState("");
  const [sortTask, setSortTask] = useState("desc");
  const [sortORDEM_VENDA, setSortORDEM_VENDA] = useState("desc");
  const [sortPRODUTO, setSortPRODUTO] = useState("desc");
  const [sortQUANTIDADE, setSortQUANTIDADE] = useState("desc");

  const handleFilterEstadoChange = (event) => {
    setSelectedFilterEstado(event.target.value);
  };

  const handleFilterPrioridadeChange = (event) => {
    setSelectedFilterPrioridade(event.target.value);
  };
  
  useEffect(() => {
    setSortTarefas([...tarefas]);
  }, [tarefas]);

  const [totalTarefas, setTotalTarefas] = useState(0);
  const [totalPendente, setTotalPendente] = useState(0);
  const [totalEmProgresso, setTotalEmProgresso] = useState(0);
  const [totalEmAtraso, setTotalEmAtraso] = useState(0);
  const [totalConcluido, setTotalConcluido] = useState(0);

  useEffect(() => {
    const filteredTarefas = tarefas.filter(
      (tarefa) =>
        tarefa.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tarefa.tarefa.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortTarefas(filteredTarefas);

    const total = filteredTarefas.length;
    const pendente = filteredTarefas.filter(
      (tarefa) => tarefa.estado === "Pendente"
    ).length;
    const emProgresso = filteredTarefas.filter(
      (tarefa) => tarefa.estado === "Em Progresso"
    ).length;
    const emAtraso = filteredTarefas.filter(
      (tarefa) => tarefa.estado === "Em Atraso"
    ).length;
    const concluido = filteredTarefas.filter(
      (tarefa) => tarefa.estado === "Concluído"
    ).length;

    setTotalTarefas(total);
    setTotalPendente(pendente);
    setTotalEmProgresso(emProgresso);
    setTotalEmAtraso(emAtraso);
    setTotalConcluido(concluido);
  }, [tarefas, searchQuery, selectedFilterEstado, selectedFilterPrioridade]);

  // Código do ordenar por ID da ordem ASC:DESC
  const __handleSortID = () => {
    const nextTask = sortTask === "asc" ? "desc" : "asc";
    const sortedTarefas = [...sortTarefas].sort((a, b) =>
      nextTask === "desc" ? a.id - b.id : b.id - a.id
    );
    setSortTarefas(sortedTarefas);
    setSortTask(nextTask);
  };

  //Adicionar a parte dos dados
  // Código do ordenar por ORDEM_VENDA ASC:DESC
  const __handleSortORDEM_VENDA = () => {
    const nextORDEM_VENDA = sortORDEM_VENDA === "asc" ? "desc" : "asc";
    const sortedORDEM_VENDA = [...sortTarefas].sort((a, b) =>
      a.ordem_venda.localeCompare(b.ordem_venda)
    );
    const orderedORDEM_VENDA =
      nextORDEM_VENDA === "asc" ? sortedORDEM_VENDA : sortedORDEM_VENDA.reverse();
    setSortTarefas(orderedORDEM_VENDA);
    setSortORDEM_VENDA(nextORDEM_VENDA);
  };

  // Código de ordenar por PRODUTO ASC:DESC
  const __handleSortPRODUTO = () => {
    const nextPRODUTO = sortPRODUTO === "asc" ? "desc" : "asc";
    const sortedPRODUTO = [...sortTarefas].sort((a, b) =>
      a.produto.localeCompare(b.produto)
    );
    const orderedPRODUTO =
      nextPRODUTO === "asc" ? sortedPRODUTO : sortedPRODUTO.reverse();
    setSortTarefas(orderedPRODUTO);
    setSortPRODUTO(nextPRODUTO);
  };

  // Código de ordenar pela quantidade ASC:DESC
  const __handleSortQUANTIDADE = () => {
    const nextQUANTIDADE = sortQUANTIDADE === "asc" ? "desc" : "asc";
    const sortedQUANTIDADE = [...sortTarefas].sort(
      (a, b) => a.quantidade - b.quantidade
    );
    const orderedQUANTIDADE =
      nextQUANTIDADE === "asc" ? sortedQUANTIDADE : sortedQUANTIDADE.reverse();
    setSortTarefas(orderedQUANTIDADE);
    setSortQUANTIDADE(nextQUANTIDADE);
  };

  //Código para atribuir tarefas
  function tarefaAtribuida({ user, tarefa }) {
    const tarefaAtr = user.tarefas_associadas;
    const ordemAtr = user.ordem_atribuidas;
    const ordemAss = tarefa.ordem_associada;
    if (ordemAss === ordemAtr) {
      setTarefasAssociadas(tarefaAtr);
    }
  }

  function __refresh() {
    window.location.reload(false);
  }

  return (
    <div className={classes.listaTarefas}>
      <HeaderPage showCaretLeft={false} showSearchBar={true} />
      <h1>Tarefas</h1>
      <AdicionarTarefa />
      <ArrowClockwise size={28} weight="light" onClick={__refresh} cursor="pointer" className={classes.iconRefresh}/>
      <Container fluid>
        <Row className={classes.containerTarefasBorder}>
          <Col lg={2} className={`${classes.boxTarefasBorder} ${classes.colMargin} ${classes.boxTarefas2rd} ${classes.textoTarefasBox}`}>
            <span>Total</span>
            <span>{totalTarefas}</span>
          </Col>
          <Col lg={2} className={`${classes.boxTarefasBorder} ${classes.colMargin} ${classes.boxTarefas2rd} ${classes.textoTarefasBox}`}>
            <span>Pendente</span>
            <span>{totalPendente}</span>
          </Col>
          <Col lg={2} className={`${classes.boxTarefasBorder} ${classes.colMargin} ${classes.boxTarefas3rd} ${classes.textoTarefasBox}`}>
            <span> Progresso</span>
            <span>{totalEmProgresso}</span>
          </Col>
          <Col lg={2} className={`${classes.boxTarefasBorder} ${classes.colMargin} ${classes.boxTarefas4th} ${classes.textoTarefasBox}`}>
            <span>Concluído</span>
            <span>{totalConcluido}</span>
          </Col>
          <Col lg={2} className={`${classes.boxTarefasBorder} ${classes.colMargin} ${classes.boxTarefas5th} ${classes.textoTarefasBox}`}>
            <span>Em atraso</span>
            <span>{totalEmAtraso}</span>
          </Col>
        </Row>
      </Container>
      <div className={classes.filterBarTarefas}>
        &nbsp;
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`${classes.filterBarTarefaItem} ${classes.searchBarTarefas}`} placeholder="Procurar"/>
        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
          <MagnifyingGlass size={24} color="#2e5a53" />
        </button>
        <select id="filterEstado" className={`${classes.filterBarTarefasItem} ${classes.filterEstado}`} value={selectedFilterEstado} onChange={handleFilterEstadoChange}>
          <option value="" disabled hidden style={{ color: "rgba(255, 0, 0, 0.5)" }}>
            Estado
          </option>
          <option value="">Todas</option>
          <option value="Em Atraso">Em atraso</option>
          <option value="Pendente">Pendente</option>
          <option value="Concluído">Concluído</option>
          <option value="Em Progresso">Em progresso</option>
        </select>
        <select id="filterEstado" className={`${classes.filterBarTarefasItem} ${classes.filterPrioridade}`} value={selectedFilterPrioridade} onChange={handleFilterPrioridadeChange}>
          <option value="" disabled hidden style={{ color: "rgba(255, 0, 0, 0.5)" }}>
            Prioridade
          </option>
          <option value="">Todas</option>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <Table bordered className={`${classes["table-bordered"]} ${classes.tableSpacing}`} style={{ color: "#120309" }}>
        <thead>
          <tr>
            <th key="id">
              <div onClick={__handleSortID} style={{ position: "relative" }}>
                <span> ORDEM ID</span>
                {sortTask === "asc" ? (
                  <CaretUp size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretUp size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
                {sortTask === "desc" ? (
                  <CaretDown size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretDown size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
              </div>
            </th>
            <th key="ordem_venda">
              <div onClick={__handleSortORDEM_VENDA} style={{ position: "relative" }}>
                <span>ORDEM DE VENDA</span>
                {sortORDEM_VENDA === "desc" ? (
                  <CaretUp size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretUp size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
                {sortORDEM_VENDA === "asc" ? (
                  <CaretDown size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretDown size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
              </div>
            </th>
            <th key="produto">
              <div onClick={__handleSortPRODUTO} style={{ position: "relative" }}>
                <span>PRODUTO</span>
                {sortPRODUTO === "desc" ? (
                  <CaretUp size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretUp size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
                {sortPRODUTO === "asc" ? (
                  <CaretDown size={16} weight="" style={{ position: "absolute" }} />
                ) : (
                  <CaretDown size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
              </div>
            </th>
            <th key="quantidade">
              <div onClick={__handleSortQUANTIDADE} style={{ position: "relative" }}>
                <span>QUANTIDADE</span>
                {sortQUANTIDADE === "desc" ? (
                  <CaretUp size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretUp size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
                {sortQUANTIDADE === "asc" ? (
                  <CaretDown size={16} weight="" style={{ position: "absolute" }}/>
                ) : (
                  <CaretDown size={16} weight="fill" style={{ position: "absolute" }}/>
                )}
              </div>
            </th>
            <th key="tarefas">TAREFAS</th>
            <th key="operadores">OPERADORES</th>
            <th key="prioridade">PRIORIDADE</th>
            <th key="estado">ESTADO</th>
            <th key="acoes">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {sortTarefas.map((tarefa) => (
            <tr key={tarefa.id} style={CorEstado({ tarefa })}>
              <td>{tarefa.ordem_associada}</td>
              <td>{tarefa.ordem_venda}</td>
              <td>
                <span>
                  {tarefa.produto}
                  <Info size={20} className="mx-1" />
                </span>
              </td>
              <td>{tarefa.quantidade}</td>
              <td>
                <span>
                  {tarefasAssociadas}
                  <Info size={20} className="mx-1" />
                </span>
              </td>
              <td>
                {tarefa.operario_associado ? tarefa.operario_associado.join(", ") : ""}
              </td>
              <td>{tarefa.prioridade}</td>
              <td>{tarefa.estado}</td>
              <td key="acoes">
                <span>
                  <Link style={CorEstado({ tarefa })} to={`/tarefas/${tarefa.id}`}>
                    <ReadCvLogo size={25} weight="light" alt="CONSULTAR" />
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default TarefasList;
