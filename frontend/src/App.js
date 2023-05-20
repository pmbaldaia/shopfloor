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

//operarios
import OperariosRootLayout from "./pages/Operarios/rootOperario";
import OperarioDetailPage from "./pages/Operarios/detalheOperario"; /* 
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

import Login from "./pages/Login/login";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/user";
import RootLayout from "./pages/Layout/layout";

//Loading
import Loading from "./components/Loading/loading";

const OrdensPage = React.lazy(() => import("./pages/Ordens/ordens"));
const OperariosPage = React.lazy(() => import("./pages/Operarios/operarios"));

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
  }, []);

  useEffect(() => {
    if (user.access_token) {
      setIsLoading(false);
    }
  }, [user.access_token]);
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <AppLayout />,
  //     errorElement: <ErrorPage />,
  //     id: "root",
  //     loader: tokenLoader,
  //     children: [
  //       { index: true, element: <Login /> },
  //       {
  //         path: "ordens",
  //         element: <OrdensRootLayout />,
  //         children: [
  //           {
  //             index: true,
  //             element: <OrdensPage />,
  //             loader: ordensLoader,
  //           },
  //           {
  //             path: ":ordemId",
  //             id: "ordem-detail",
  //             loader: ordemDetailLoader,
  //             children: [
  //               {
  //                 index: true,
  //                 element: <OrdemDetailPage />,
  //                 action: deleteOrdemAction,
  //               },
  //               {
  //                 path: "editar",
  //                 element: <EditOrdemPage />,
  //                 action: manipulateOrdemAction,
  //                 loader: checkAuthLoader,
  //               },
  //             ],
  //           },
  //           {
  //             path: "nova",
  //             element: <NewOrdemPage />,
  //             action: manipulateOrdemAction,
  //             loader: checkAuthLoader,
  //           },
  //         ],
  //       },
  //       {
  //         path: "operarios",
  //         element: <OperariosRootLayout />,
  //         children: [
  //           {
  //             index: true,
  //             element: <OperariosPage />,
  //             loader: operariosLoader,
  //           },
  //           {
  //             path: ":operarioId",
  //             id: "operario-detail",
  //             loader: operarioDetailLoader,
  //             children: [
  //               {
  //                 index: true,
  //                 element: <OperarioDetailPage />,
  //                 action: deleteOperarioAction,
  //               },
  //               {
  //                 path: "editar",
  //                 element: <EditOperarioPage />,
  //                 action: manipulateOperarioAction,
  //                 loader: checkAuthLoader,
  //               },
  //             ],
  //           },
  //           {
  //             path: "nova",
  //             element: <NewOperarioPage />,
  //             action: manipulateOperarioAction,
  //             loader: checkAuthLoader,
  //           },
  //         ],
  //       },
  //       {
  //         path: "auth",
  //         element: <Login />,
  //       },
  //       {
  //         path: "maquinas",
  //         element: <Maquinas />,
  //       },
  //       {
  //         path: "materiais",
  //         element: <Materiais />,
  //       },
  //       {
  //         path: "sobre",
  //         element: <Sobre />,
  //       },
  //       {
  //         path: "dashboard",
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "logout",
  //         action: logoutAction,
  //       },
  //     ],
  //   },
  // ]);
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
              <Route element={<OperariosRootLayout />}>
                <Route path="/operarios" element={<OperariosPage />} />
                <Route
                  path="/operarios/:operarioId"
                  element={<OperarioDetailPage />}
                />
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
