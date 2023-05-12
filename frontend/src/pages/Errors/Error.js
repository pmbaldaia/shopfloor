import { useRouteError } from "react-router-dom";
import SideBar from "../../components/SideBar/sidebar";
import Dashboard from "../../pages/Dashboard/dashboard";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Página Não Encontrada";
    message = "Com erro ou sem ligação ou não existe";
  }

  return (
    <>
      <SideBar />
      <Dashboard title={title}>
        <p>{message}</p>
      </Dashboard>
    </>
  );
}

export default ErrorPage;
