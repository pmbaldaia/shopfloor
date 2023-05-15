import React, { useState, useEffect } from "react";
import TarefaItem from "../../components/Tarefas/itemTarefa";
import { getTarefas } from "../../axios/tarefas";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function TarefaDetailPage(params) {
  const user = useSelector((state) => state.user);
  const [tarefa, setTarefa] = useState(null);
  const { tarefaId } = useParams();
  useEffect(() => {
    getTarefas(user.access_token, tarefaId).then((res) => {
      setTarefa(res.data + tarefaId);
    });
  }, [user.access_token, tarefaId]);

  return <div>{tarefa && <TarefaItem tarefa={tarefa} />}</div>;
}

export default TarefaDetailPage;
