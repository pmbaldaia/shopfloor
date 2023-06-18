import axios from "./configs";

export const getTipos = (access_token) => {
  return axios.get("/tipos", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getTipoById = (access_token, tipoId) => {
  return axios.get(`/tipos/${tipoId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
