import axios from "./configs";

export const getOperarios = (access_token) => {
  return axios.get("/operarios", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};
