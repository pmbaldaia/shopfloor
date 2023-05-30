import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
/* import AppLayout from "./pages/Layout/layout"; */
import Dashboard from "./pages/Dashboard/dashboard";

//ordens
import OrdensRootLayout from "./pages/Ordens/rootOrdem";
import EditOrdemPage from "./pages/Ordens/editarOrdem.js";
import OrdemDetailPage from "./pages/Ordens/detalheOrdem";
import NewOrdemPage from "./pages/Ordens/novaOrdem";
/* import { action as manipulateOrdemAction } from "./components/Ordens/formOrdem"; */

//utilizadores
import UsersRootLayout from "./pages/Users/rootUser";
import UserDetailPage from "./pages/Users/detalheUser"; /* 
import NewOperarioPage from "./pages/Operarios/novoOperario"; */
/* import EditOperarioPage from "./pages/Operarios/editarOperario"; */

/* import NewOperarioPage from "./pages/Ordens/novaOrdem";
import { action as manipulateOperarioAction } from "./components/Operarios/formOperario";
 */
//Maquinas
import MaquinasRootLayout from "./pages/Maquinas/rootMaquina";
import MaquinasPage from "./pages/Maquinas/maquinas";
import MaquinaDetailPage from "./pages/Maquinas/detalheMaquina";

//Materiais
import MateriaisRootLayout from "./pages/Materiais/rootMaterial";
import MateriaisPage from "./pages/Materiais/materiais";

//Tarefas
import TarefasRootLayout from "./pages/Tarefas/rootTarefa";
import TarefasPage from "./pages/Tarefas/tarefas";
import TarefaDetailPage from "./pages/Tarefas/detalheTarefa";

/* import ErrorPage from "./pages/Errors/Error"; */
//Página Dos Operários
import LayoutOperarios from "./pages/LayoutOperario/operario";

import Login from "./pages/Login/login";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user";
import RootLayout from "./pages/Layout/layout";

//Loading
import Loading from "./components/Loading/loading";

const OrdensPage = React.lazy(() => import("./pages/Ordens/ordens"));
const UsersPage = React.lazy(() => import("./pages/Users/users"));

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userActions.login({ access_token: token }));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.access_token) {
      setIsLoading(false);
    }
  }, [user.access_token]);
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
            <Route element={<RootLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element={<OrdensRootLayout />}>
                <Route path="/ordens" element={<OrdensPage />} />
                <Route path="/ordens/:ordemId" element={<OrdemDetailPage />} />
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
              </Route>
              <Route element={<MateriaisRootLayout />}>
                <Route path="/materiais" element={<MateriaisPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/dashboard" />} />
              {/*  <Route
                path="/operarios"
                element={
                  <React.Fragment>
                    <LayoutOperarios />
                  </React.Fragment>
                }
              /> */}
              <Route
                path="/operarios"
                element={
                  <React.Fragment>
                    <LayoutOperarios />
                  </React.Fragment>
                }
              />
            </Route>
          )}
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
