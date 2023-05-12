import axios from "./configs";

export const getOrdens = (access_token) => {
  return axios.get("/ordens", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};
