import axios from "./configs";

export const getMaquinas = (access_token) => {
  return axios.get("/maquinas", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};
