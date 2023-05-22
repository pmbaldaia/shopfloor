import React, { useState, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { getOrdens } from "../../axios/ordens";
import { getTarefas } from "../../axios/tarefas";
import { useSelector } from "react-redux";
import HeaderPage from "../../components/Header/header";
import { Table, Container, Row, Col } from "react-bootstrap";
import DashboardCalendar from "../../components/Dashboard/calendar";
import LineChartDashboard from "../../components/Dashboard/lineChart";

function Dashboard() {
  function CorEstado({ ordem }) {
    const estadoLowerCase = ordem.estado.toLowerCase();
    const backgroundColor =
      estadoLowerCase === "em atraso"
        ? "#F58283"
        : estadoLowerCase === "concluído"
        ? "#70CC7A"
        : "#FFF";

    const color = estadoLowerCase === "em atraso" ? "white" : "black";

    return { backgroundColor, color };
  }
  const user = useSelector((state) => state.user);
  const [ordensEmAtraso, setOrdensEmAtraso] = useState([]);
  const [tarefasAaguardar, setTarefasAaguardar] = useState([]);

  useEffect(() => {
    fetchOrdensEmAtraso();
    fetchTarefasAaguardar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.access_token]);

  async function fetchOrdensEmAtraso() {
    try {
      const res = await getOrdens(user.access_token);
      const ordens = res.data.ordens;
      const ordensFiltradas = ordens.filter(
        (ordem) => ordem.estado === "Em Atraso"
      );

      setOrdensEmAtraso(ordensFiltradas);
    } catch (error) {
      console.error("Erro ao buscar as ordens:", error);
    }
  }

  async function fetchTarefasAaguardar() {
    try {
      const res = await getTarefas(user.access_token);
      const tarefas = res.data.tarefas;
      const tarefasFiltradas = tarefas.filter(
        (tarefa) => tarefa.estado === "A aguardar"
      );

      setTarefasAaguardar(tarefasFiltradas);
    } catch (error) {
      console.error("Erro ao buscar as ordens:", error);
    }
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <HeaderPage showCaretLeft={false} showSearchBar={true} />
            <h1 style={{ paddingBottom: "1em" }}>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Row style={{ paddingBottom: "3em" }}>
            <Col lg={6}>
              <LineChartDashboard />
            </Col>
            <Col lg={6}>
              <DashboardCalendar />
            </Col>
          </Row>
        </Row>

        <Row>
          <Row>
            <Col lg={6}>
              <div className="d-flex align-items-center justify-content-between">
                <h1 style={{ fontSize: "30px" }}>Ordens em atraso</h1>
                <Plus
                  size={32}
                  style={{ marginRight: "1.2em", cursor: "pointer" }}
                />
              </div>
              <Table bordered className="table-spacing justify">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>ID</th>
                    <th>Ordem de Venda</th>
                    <th>SAP</th>
                    <th>Prazo de Entrega</th>
                    <th>Prioridade</th>
                  </tr>
                </thead>
                <tbody>
                  {ordensEmAtraso.map((ordem) => (
                    <tr key={ordem.id} style={CorEstado({ ordem })}>
                      <td className="highlight-text">
                        <span>{ordem.nome_cliente}</span>
                      </td>
                      <td className="highlight-text-2">
                        <span>{ordem.id}</span>
                      </td>
                      <td className="highlight-text-2">
                        <span>{ordem.ordem_venda}</span>
                      </td>
                      <td className="highlight-text-2">
                        <span>{ordem.sap}</span>
                      </td>
                      <td className="highlight-text-2">
                        <span>{ordem.data_entrega}</span>
                      </td>
                      <td className="highlight-text-2">
                        <span>{ordem.prioridade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg={6}>
              <div className="d-flex align-items-center justify-content-between">
                <h1 style={{ fontSize: "30px" }}>Tarefas</h1>
                <Plus
                  size={32}
                  style={{ marginRight: "1.2em", cursor: "pointer" }}
                />
              </div>
              <Table bordered className="table-spacing justify">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>OPERÁRIO</th>
                    <th>OPERAÇÃO</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {tarefasAaguardar.map((tarefa) => (
                    <tr key={tarefa.id}>
                      <td className="highlight-text">
                        <span>{tarefa.id}</span>
                      </td>
                      <td className="highlight-text">
                        <span>{tarefa.operario}</span>
                      </td>
                      <td className="highlight-text">
                        <span>{tarefa.operacao}</span>
                      </td>
                      <td className="highlight-text">
                        <span>{tarefa.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
