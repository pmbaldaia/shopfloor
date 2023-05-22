import React, { useState, useEffect } from "react";
import { Plus } from "@phosphor-icons/react";
import { getOrdens } from "../../axios/ordens";
import { getTarefas } from "../../axios/tarefas";
import { useSelector } from "react-redux";
import HeaderPage from "../../components/Header/header";
import DashboardCalendar from "../../components/Dashboard/calendar";
import LineChartDashboard from "../../components/Dashboard/lineChart";
import { useNavigate } from "react-router-dom";
import NewOrdem from "../../components/Ordens/formOrdem";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <HeaderPage showCaretLeft={false} showSearchBar={true} />
          <h1 style={{ paddingBottom: "0.5em" }}>Dashboard</h1>
        </div>
      </div>
      <div class="row">
        <div class="row" style={{ paddingBottom: "3em" }}>
          <div class="col-lg-6">
            <LineChartDashboard />
          </div>
          <div class="col-lg-6">
            <DashboardCalendar />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row">
          <div class="col-lg-6">
            <div class="d-flex align-items-center justify-content-between">
              <h1 style={{ fontSize: "30px" }}>Ordens em atraso</h1>
              <Plus
                size={32}
                style={{ marginRight: "1.2em", cursor: "pointer" }}
                onClick={() => {
                  handleOpenModal();
                  navigate(`/ordens/nova`);
                }}
              />{" "}
              {isModalOpen && (
                <NewOrdem
                  isModalOpen={isModalOpen}
                  handleOpenModal={handleCloseModal}
                />
              )}
            </div>
            <table class="table table-bordered table-spacing justify">
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
                    <td class="highlight-text">
                      <span>{ordem.nome_cliente}</span>
                    </td>
                    <td class="highlight-text-2">
                      <span>{ordem.id}</span>
                    </td>
                    <td class="highlight-text-2">
                      <span>{ordem.ordem_venda}</span>
                    </td>
                    <td class="highlight-text-2">
                      <span>{ordem.sap}</span>
                    </td>
                    <td class="highlight-text-2">
                      <span>{ordem.data_entrega}</span>
                    </td>
                    <td class="highlight-text-2">
                      <span>{ordem.prioridade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="col-lg-6">
            <div class="d-flex align-items-center justify-content-between">
              <h1 style={{ fontSize: "30px" }}>Tarefas</h1>
              <Plus
                size={32}
                style={{ marginRight: "1.2em", cursor: "pointer" }}
                o
              />
            </div>
            <table class="table table-bordered table-spacing justify">
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
                    <td class="highlight-text">
                      <span>{tarefa.id}</span>
                    </td>
                    <td class="highlight-text">
                      <span>{tarefa.operario}</span>
                    </td>
                    <td class="highlight-text">
                      <span>{tarefa.operacao}</span>
                    </td>
                    <td class="highlight-text">
                      <span>{tarefa.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
