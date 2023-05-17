import axios from "./configs";

export const getMaquinas = (access_token) => {
  return axios.get("/maquinas", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getMaquinaById = (access_token, maquinaId) => {
  return axios.get(`/maquinas/${maquinaId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
