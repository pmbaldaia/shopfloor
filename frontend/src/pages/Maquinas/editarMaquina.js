import { useRouteLoaderData } from "react-router-dom";

import MaquinaForm from "../../components/Maquinas/formMaquina";

function EditMaquinaPage() {
  const data = useRouteLoaderData("maquina-detail");

  return <MaquinaForm method="patch" maquina={data.maquina} />;
}

export default EditMaquinaPage;
