import axios from "./configs";

export const login = (body) => {
  return axios.post("/login", body);

  /*
  {
    headers:{
      Authorization: `Brearer ${access_token}`
    }
  }
  */
};
