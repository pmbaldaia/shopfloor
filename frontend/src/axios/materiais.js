import axios from "./configs";

export const getMateriais = (access_token) => {
  return axios.get("/materiais", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getMaterialById = (access_token, materialId) => {
  return axios.get(`/materiais/${materialId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
