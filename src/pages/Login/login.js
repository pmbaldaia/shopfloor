import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, useActionData, useNavigation } from "react-router-dom";
import logo from "../../assets/images/logobranco.png";
import logoverde from "../../assets/images/logoverde.png";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./login.css";

export default function Login() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  //Toggle Password
  const today = new Date();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-7 d-none d-md-flex bg-image">
            <p className="fixed-bottom footer">
              © {today.getFullYear()} Riopele Group{" "}
            </p>
            <img src={logo} alt="" />
          </div>
          <div className="col-md-5 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    {data && data.errors && (
                      <ul>
                        {Object.values(data.errors).map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    {data && data.message && <p>{data.message}</p>}
                    {width > 767 ? (
                      <h3 className="display-4">LOGIN</h3>
                    ) : (
                      <img
                        style={{ alignSelf: "center" }}
                        src={logoverde}
                        alt="logo"
                      />
                    )}
                    <Form method="post">
                      <div className="mb-3" htmlFor="num_func">
                        <input
                          id="num_func"
                          name="num_func"
                          type="text"
                          placeholder="ID Funcionário"
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <input
                            id="pass_func"
                            placeholder="Palavra-Passe"
                            type={passwordType}
                            onChange={handlePasswordChange}
                            value={passwordInput}
                            name="pass_func"
                            className="form-control rounded-pill border-0 shadow-sm px-4"
                            required
                          />
                          <span
                            className="rounded-pill border-0 shadow-sm eyeIcon"
                            type="button"
                            style={{
                              width: "3rem",
                              paddingTop: "0.3rem",
                              textAlign: "center",
                              color: "#3a5a40",
                              backgroundColor: "white",
                            }}
                            onClick={togglePassword}
                          >
                            {passwordType === "password" ? (
                              <Eye />
                            ) : (
                              <EyeSlash />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="d-grid gap-2 mt-4">
                        <button
                          type="submit"
                          className="btn btn-block text-uppercase mb-2 mt-4 rounded"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "A enviar..." : "LOGIN"}
                        </button>
                      </div>

                      <div className="text-center d-flex justify-content-center mt-2">
                        <a href="/">Esqueceu-se da palavra-passe?</a>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
