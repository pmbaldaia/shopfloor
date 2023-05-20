import axios from "./configs";

export const getOperarios = (access_token) => {
  return axios.get("/operarios", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getOperarioById = (access_token, operarioId) => {
  return axios.get(`/operarios/${operarioId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
