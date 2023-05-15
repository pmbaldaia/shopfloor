import { useRouteLoaderData } from "react-router-dom";

import MaterialForm from "../../components/Materiais/formMateriais";

function EditMaterialPage() {
  const data = useRouteLoaderData("material-detail");

  return <MaterialForm method="patch" material={data.material} />;
}

export default EditMaterialPage;
