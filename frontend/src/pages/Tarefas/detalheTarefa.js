import React, { useState, useEffect } from "react";
import TarefaItem from "../../components/Tarefas/itemTarefa";
import { getTarefaById } from "../../axios/tarefas";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OrdemDetailPage() {
  const user = useSelector((state) => state.user);
  const [tarefa, setTarefa] = useState(null);
  const { tarefaId } = useParams();
  useEffect(() => {
    const getTarefaByIdFunc = async () => {
      let tarefaById = await getTarefaById(user.access_token, tarefaId);
      setTarefa(tarefaById.data.tarefa);
    };
    getTarefaByIdFunc();
  }, [user.access_token, tarefaId]);

  return <div>{tarefa && <TarefaItem tarefa={tarefa} />}</div>;
}

export default OrdemDetailPage;
