import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import jwt_decode from "jwt-decode";

//ordens
import OrdensRootLayout from "./pages/Ordens/rootOrdem";
import EditOrdemPage from "./pages/Ordens/editarOrdem.js";
import OrdemDetailPage from "./pages/Ordens/detalheOrdem";
import NewOrdemPage from "./pages/Ordens/novaOrdem";

//utilizadores
import UsersRootLayout from "./pages/Users/rootUser";
import UserDetailPage from "./pages/Users/detalheUser";

//Maquinas
import MaquinasRootLayout from "./pages/Maquinas/rootMaquina";
import MaquinasPage from "./pages/Maquinas/maquinas";
import MaquinaDetailPage from "./pages/Maquinas/detalheMaquina";
import NewMaquinaPage from "./pages/Maquinas/novaMaquina";

//Tarefas
import TarefasRootLayout from "./pages/Tarefas/rootTarefa";
import TarefasPage from "./pages/Tarefas/tarefas";
import TarefaDetailPage from "./pages/Tarefas/detalheTarefa";

//Manutencao
import ManutencaoCategorias from "./pages/Manutencao/categorias";
import ManutencaoTipo from "./pages/Manutencao/tipos";
import ManutencaoEstacoes from "./pages/Manutencao/estacoes";

//Página Dos Operários
import MenuOperarios from "./pages/EcraOperario/menu";
import LayoutOperario from "./pages/Layout/layoutOperario";
import OperariosTarefas from "./components/EcraOperario/Tarefas/tarefas";
import OperariosMaquinas from "./components/EcraOperario/Maquinas/maquinas";
import OperariosDefinicoes from "./components/EcraOperario/Definicoes/definicoes";

import Login from "./pages/Login/login";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user";
import RootLayout from "./pages/Layout/layout";

import Loading from "./components/Loading/loading";

const OrdensPage = React.lazy(() => import("./pages/Ordens/ordens"));
const UsersPage = React.lazy(() => import("./pages/Users/users"));

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  function decodeToken(token) {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.log("Erro ao decodificar o token:", error);
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
        dispatch(userActions.login({ access_token: token }));
      } else {
        // Caso o token seja inválido ou expirado, faça o logout do usuário
        dispatch(userActions.logout());
      }
    } else {
      // Caso não haja token no localStorage, faça o logout do usuário
      dispatch(userActions.logout());
    }
    setIsLoading(false);
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
  };

  const decodedToken = decodeToken(localStorage.getItem("token"));
  const userType = decodedToken?.user?.tipo;

  return (
    <>
      {!isLoading ? (
        <Routes>
          {!user.access_token ? (
            <>
              <Route path="/auth" element={<Login />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          ) : (
            <Route element={<RootLayout onLogout={handleLogout} />}>
              {userType === "gestor" && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route element={<OrdensRootLayout />}>
                    <Route path="/ordens" element={<OrdensPage />} />
                    <Route
                      path="/ordens/:ordemId"
                      element={<OrdemDetailPage />}
                    />
                    <Route
                      path="/ordens/:ordemId/editar"
                      element={<EditOrdemPage />}
                    />
                    <Route path="/ordens/nova" element={<NewOrdemPage />} />
                  </Route>
                  <Route element={<TarefasRootLayout />}>
                    <Route path="/tarefas" element={<TarefasPage />} />
                    <Route
                      path="/tarefas/:tarefaId"
                      element={<TarefaDetailPage />}
                    />
                  </Route>
                  <Route element={<UsersRootLayout />}>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/:userId" element={<UserDetailPage />} />
                  </Route>
                  <Route element={<MaquinasRootLayout />}>
                    <Route path="/maquinas" element={<MaquinasPage />} />
                    <Route
                      path="/maquinas/:maquinaId"
                      element={<MaquinaDetailPage />}
                    />
                    <Route path="/maquinas/nova" element={<NewMaquinaPage />} />
                  </Route>

                  <Route
                    path="/manutencao/categorias"
                    element={<ManutencaoCategorias />}
                  />
                  <Route
                    path="/manutencao/tipos"
                    element={<ManutencaoTipo />}
                  />
                  <Route
                    path="/manutencao/estacoes"
                    element={<ManutencaoEstacoes />}
                  />
                </>
              )}

              <Route element={<LayoutOperario onLogout={handleLogout} />}>
                {userType === "operario" && (
                  <>
                    <Route path="/operarios" element={<MenuOperarios />} />
                    <Route
                      path="/operarios/tarefas"
                      element={<OperariosTarefas />}
                    />{" "}
                    <Route
                      path="/operarios/maquinas"
                      element={<OperariosMaquinas />}
                    />{" "}
                    <Route
                      path="/operarios/definicoes"
                      element={<OperariosDefinicoes />}
                    />
                    <Route path="*" element={<Navigate to="/operarios" />} />
                  </>
                )}
              </Route>
            </Route>
          )}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
