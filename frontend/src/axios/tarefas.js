import axios from "./configs";

export const getTarefas = (access_token) => {
  return axios.get("/tarefas", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getTarefaById = (access_token, tarefaId) => {
  return axios.get(`/tarefas/${tarefaId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
