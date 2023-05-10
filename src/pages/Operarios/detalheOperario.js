import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import OperarioItem from "../../components/Operarios/itemOperario";
import { getAuthToken } from "../../util/auth";

function OperarioDetailPage() {
  const { operario } = useRouteLoaderData("ordem-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={operario}>
          {(loadedOperario) => <OperarioItem ordem={loadedOperario} />}
        </Await>
      </Suspense>
    </>
  );
}

export default OperarioDetailPage;

async function loadOperario(id) {
  const response = await fetch("http://localhost:8080/operarios/" + id);

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter detalhes do operário" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.operario;
  }
}

async function loadOperarios() {
  const response = await fetch("http://localhost:8080/operarios");

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter os dados" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.operarios;
  }
}

export async function loader({ request, params }) {
  const id = params.operarioId;

  return defer({
    operario: await loadOperario(id),
    operarios: loadOperarios(),
  });
}

export async function action({ params, request }) {
  const operarioId = params.operarioId;

  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/operarios/" + operarioId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Não pode apagar o operário" },
      {
        status: 500,
      }
    );
  }
  return redirect("/operarios");
}
