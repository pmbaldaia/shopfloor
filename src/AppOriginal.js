import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/Layout/layout";
import ErrorPage from "./pages/Errors/Error";
import Dashboard from "./pages/Dashboard/dashboard";
import OrdensRootLayout from "./pages/Ordens/rootOrdem";
import PaginaAutenticacao, { action as authAction } from "./pages/Auth/Autenticacao";
import { action as logoutAction } from "./pages/Auth/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import EditOrdemPage from "./pages/Ordens/editarOrdem.js";
import OrdemDetailPage, {
  loader as ordemDetailLoader,
  action as deleteEventAction,
} from "./pages/Ordens/detalheOrdem";
import OrdensPage, { loader as ordensLoader } from "./pages/Ordens/ordens";
import NewOrdemPage from "./pages/Ordens/novaOrdem";
import { action as manipulateOrdemAction } from "./components/Ordens/formOrdem";
import Operarios from "./pages/Operarios/operarios";
import Maquinas from "./pages/Maquinas/maquinas";
import Materiais from "./pages/Materiais/materiais";
import Sobre from "./pages/Sobre/sobre";
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
                action: deleteEventAction,
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
        path: "auth",
        element: <PaginaAutenticacao />,
        action: authAction,
      },
      {
        path: "operarios",
        element: <Operarios />,
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