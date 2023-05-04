import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import OrdensList from "../../components/Ordens/listaOrdens";

function OrdensPage() {
  const { ordens } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={ordens}>
        {(loadedOrdens) => <OrdensList ordens={loadedOrdens} />}
      </Await>
    </Suspense>
  );
}

export default OrdensPage;

async function loadOrdens() {
  const response = await fetch("http://localhost:8080/ordens");

  if (!response.ok) {
    throw json(
      { message: "Não foi possível obter as ordens" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.ordens;
  }
}

export function loader() {
  return defer({
    ordens: loadOrdens(),
  });
}
