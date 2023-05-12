import { useRouteLoaderData } from "react-router-dom";

import OperarioForm from "../../components/Operarios/formOperario";

function EditOperarioPage() {
  const data = useRouteLoaderData("operario-detail");

  return <OperarioForm method="patch" ordem={data.operario} />;
}

export default EditOperarioPage;
