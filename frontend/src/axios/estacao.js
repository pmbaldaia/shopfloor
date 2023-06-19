import axios from "./configs";

export const getEstacoes = (access_token) => {
  return axios.get("/estacao", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getEstacaoById = (access_token, estacaoId) => {
  return axios.get(`/estacao/${estacaoId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
