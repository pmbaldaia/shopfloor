import React from "react";
import jwt_decode from "jwt-decode";

function HiUser() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const nome = decoded.user.nome;

  return (
    <>
      <p>
        <span>
          <span
            style={{ fontWeight: "600", color: "#3a5a40", fontSize: "27px" }}
          >
            {nome}
          </span>
        </span>
      </p>
    </>
  );
}

export default HiUser;
