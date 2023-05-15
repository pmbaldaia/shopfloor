import axios from "./configs";

export const getMateriais = (access_token) => {
  return axios.get("/materiais", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};
