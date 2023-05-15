import { useState, useEffect } from "react";
import TarefasList from "../../components/Tarefas/listaTarefas";
import { getTarefas } from "../../axios/tarefas";
import { useSelector } from "react-redux";

function TarefasPage() {
  const user = useSelector((state) => state.user);
  const [tarefas, setTarefas] = useState(null);

  useEffect(() => {
    getTarefas(user.access_token).then((res) => {
      setTarefas(res.data.tarefas);
    });
  }, []);

  return <div>{tarefas ? <TarefasList tarefas={tarefas} /> : null}</div>;
}

export default TarefasPage;
