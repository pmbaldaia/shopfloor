import React, { useState, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { getOrdens } from "../../axios/ordens";
import { useSelector } from "react-redux";
import HeaderPage from "../../components/Header/header";
import { Table, Container, Row, Col } from "react-bootstrap";
import DashboardCalendar from "../../components/Dashboard/calendar";
import { Line } from "react-chartjs-2";
import Loading from "../../components/Dashboard/loading";

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
  const [ordensData, setOrdensData] = useState([]);

  useEffect(() => {
    fetchOrdensEmAtraso();
    fetchOrdensDatas();
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

  //
  /* const ordensFiltradas = ordens
        .filter(
          (ordem) =>
            ordem.estado === "Em Atraso" || ordem.estado === "Pendente"
        )
        .sort((a, b) =>
          a.estado === "Em Atraso" && b.estado !== "Em Atraso"
            ? -1
            : b.estado === "Em Atraso" && a.estado !== "Em Atraso"
            ? 1
            : 0
        ); */

  async function fetchOrdensDatas() {
    try {
      const res = await getOrdens(user.access_token);
      const ordens = res.data.ordens;
      if (ordens && ordens.length > 0) {
        const chartData = {
          labels: ordens.map((ordem) => ordem.data_prevista_entrada_tecido),
          datasets: [
            {
              label: "Quantidade Fornecida",
              data: ordens.map((ordem) => ordem.quantidade_fornecida),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
            {
              label: "Quantidade Expedida",
              data: ordens.map((ordem) => ordem.quantidade_expedida),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        };
        const options = {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                source: "auto",
              },
            },
          },
        };

        setOrdensData({ data: chartData, options });
      }
    } catch (error) {
      console.error("Erro ao buscar as ordens:", error);
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            <HeaderPage showCaretLeft={false} showSearchBar={true} />
            <h1>Dashboard</h1>
          </Col>
        </Row>
        <Row>
          <Row style={{ paddingBottom: "3em" }}>
            <Col lg={6}>
              {ordensData && ordensData.labels && ordensData.datasets ? (
                <Line
                  data={ordensData}
                  options={{
                    scales: {
                      x: {
                        type: "time",
                        time: {
                          unit: "day",
                        },
                        ticks: {
                          source: "auto",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <Loading />
              )}
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
                <h1>Ordens em atraso</h1>
                <Plus size={32} />
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
                <span>Tarefas</span>
                <Plus size={32} />
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
                <tbody></tbody>
              </Table>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
