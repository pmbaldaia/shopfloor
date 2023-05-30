import axios from "./configs";

export const getUsers = (access_token) => {
  return axios.get("/users", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUserById = (access_token, userId) => {
  return axios.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
