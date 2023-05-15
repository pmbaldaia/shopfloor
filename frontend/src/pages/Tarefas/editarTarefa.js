import { useRouteLoaderData } from "react-router-dom";

import TarefaForm from "../../components/Tarefas/formTarefa";

function EditTarefaPage() {
  const data = useRouteLoaderData("tarefa-detail");

  return <TarefaForm method="patch" tarefa={data.tarefa} />;
}

export default EditTarefaPage;
