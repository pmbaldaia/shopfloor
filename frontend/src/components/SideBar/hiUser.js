import React from "react";
import jwt_decode from "jwt-decode";

function HiUser() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const num_func = decoded.num_func;
  console.log(decoded);

  return (
    <>
      <p>
        <span>
          Olá{" "}
          <span style={{ fontWeight: "600", color: "#3a5a40" }}>
            {num_func}
          </span>
          !
        </span>
      </p>
    </>
  );
}

export default HiUser;
