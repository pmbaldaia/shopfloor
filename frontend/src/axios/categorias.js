import axios from "./configs";

export const getCategorias = (access_token) => {
  return axios.get("/categorias", {
    headers: {
      Authorization: `Brearer ${access_token}`,
    },
  });
};

export const getCategoriaById = (access_token, categoriaId) => {
  return axios.get(`/categorias/${categoriaId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
