import { json as jsonResponse, redirect } from "react-router-dom";

import AuthForm from "../../pages/Login/login";

function PaginaAutenticacao() {
  return <AuthForm />;
}

export default PaginaAutenticacao;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    num_func: data.get("num_func"),
    pass_func: data.get("pass_func"),
  };

  const response = await fetch('http://localhost:8080/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw jsonResponse(
      { message: "Could not authenticate user." },
      { status: 500 }
    );
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
