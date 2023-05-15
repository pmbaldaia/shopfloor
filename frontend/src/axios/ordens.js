import axios from "./configs";

export const getOrdens = (access_token) => {
  return axios.get("/ordens", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getOrdemById = (access_token, ordemId) => {
  return axios.get(`/ordens/${ordemId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
