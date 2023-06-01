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

export const updateUserTipo = async (access_token, userId, novoTipo) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/users/${userId}`,
      { tipo: novoTipo },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
