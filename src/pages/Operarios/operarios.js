import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import OperariosList from "../../components/Operarios/listaOperarios";

function OperariosPage() {
  const { operarios } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={operarios}>
        {(loadedOperarios) => <OperariosList operarios={loadedOperarios} />}
      </Await>
    </Suspense>
  );
}

export default OperariosPage;

async function loadOperarios() {
  const response = await fetch("http://localhost:8080/operarios");

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter os operários" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.operarios;
  }
}

export function loader() {
  return defer({
    operarios: loadOperarios(),
  });
}
