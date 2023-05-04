import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import OrderItem from "../../components/Ordens/itemOrdem";
import { getAuthToken } from "../../util/auth";

function OrdemDetailPage() {
  const { ordem } = useRouteLoaderData("ordem-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={ordem}>
          {(loadedOrdem) => <OrderItem ordem={loadedOrdem} />}
        </Await>
      </Suspense>
    </>
  );
}

export default OrdemDetailPage;

async function loadOrdem(id) {
  const response = await fetch("http://localhost:8080/ordens/" + id);

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter detalhes da ordem" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.ordem;
  }
}

async function loadOrdens() {
  const response = await fetch("http://localhost:8080/ordens");

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter os dados" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.ordens;
  }
}

export async function loader({ request, params }) {
  const id = params.ordemId;

  return defer({
    ordem: await loadOrdem(id),
    ordens: loadOrdens(),
  });
}

export async function action({ params, request }) {
  const ordemId = params.ordemId;

  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/ordens/" + ordemId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Não pode apagar a ordem" },
      {
        status: 500,
      }
    );
  }
  return redirect("/ordens");
}
