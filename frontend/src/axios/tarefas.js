import axios from "./configs";

export const getTarefas = (access_token) => {
  return axios.get("/tarefas", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};
