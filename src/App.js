import React/* , { useState }  */from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/Layout/layout";
import Dashboard from "./pages/Dashboard/dashboard";

//autenticacao
import PaginaAutenticacao, {
  action as authAction,
} from "./pages/Auth/Autenticacao";
import { action as logoutAction } from "./pages/Auth/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

//ordens
import OrdensRootLayout from "./pages/Ordens/rootOrdem";
import EditOrdemPage from "./pages/Ordens/editarOrdem.js";
import OrdemDetailPage, {
  loader as ordemDetailLoader,
  action as deleteOrdemAction,
} from "./pages/Ordens/detalheOrdem";
import OrdensPage, { loader as ordensLoader } from "./pages/Ordens/ordens";
import NewOrdemPage from "./pages/Ordens/novaOrdem";
import { action as manipulateOrdemAction } from "./components/Ordens/formOrdem";

//operarios
import OperariosRootLayout from "./pages/Operarios/rootOperario";
import EditOperarioPage from "./pages/Operarios/editarOperario";
import OperarioDetailPage, {
  loader as operarioDetailLoader,
  action as deleteOperarioAction,
} from "./pages/Operarios/detalheOperario";
import OperariosPage, {
  loader as operariosLoader,
} from "./pages/Operarios/operarios";
import NewOperarioPage from "./pages/Ordens/novaOrdem";
import { action as manipulateOperarioAction } from "./components/Operarios/formOperario";

import Maquinas from "./pages/Maquinas/maquinas";
import Materiais from "./pages/Materiais/materiais";
import Sobre from "./pages/Sobre/sobre";
import ErrorPage from "./pages/Errors/Error";
import Login from "./pages/Login/login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Login /> },
      {
        path: "ordens",
        element: <OrdensRootLayout />,
        children: [
          {
            index: true,
            element: <OrdensPage />,
            loader: ordensLoader,
          },
          {
            path: ":ordemId",
            id: "ordem-detail",
            loader: ordemDetailLoader,
            children: [
              {
                index: true,
                element: <OrdemDetailPage />,
                action: deleteOrdemAction,
              },
              {
                path: "editar",
                element: <EditOrdemPage />,
                action: manipulateOrdemAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "nova",
            element: <NewOrdemPage />,
            action: manipulateOrdemAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "operarios",
        element: <OperariosRootLayout />,
        children: [
          {
            index: true,
            element: <OperariosPage />,
            loader: operariosLoader,
          },
          {
            path: ":operarioId",
            id: "operario-detail",
            loader: operarioDetailLoader,
            children: [
              {
                index: true,
                element: <OperarioDetailPage />,
                action: deleteOperarioAction,
              },
              {
                path: "editar",
                element: <EditOperarioPage />,
                action: manipulateOperarioAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "nova",
            element: <NewOperarioPage />,
            action: manipulateOperarioAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <PaginaAutenticacao />,
        action: authAction,
      },
      {
        path: "maquinas",
        element: <Maquinas />,
      },
      {
        path: "materiais",
        element: <Materiais />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  
  return <RouterProvider router={router} /> 
}

export default App;
