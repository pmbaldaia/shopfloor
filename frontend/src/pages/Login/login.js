import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logobranco.png";
import logoverde from "../../assets/images/logoverde.png";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import "./login.css";
import { login } from "../../axios/autenticacao";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const today = new Date();

  const [passwordType, setPasswordType] = useState("password");
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  // eslint-disable-next-line
  const [showPassword, setShowPassword] = useState(false);
  const [isGestor, setIsGestor] = useState(false);

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

  function submitLogin() {
    const loginData = {
      num_func: userInput,
    };

    if (isGestor) {
      loginData.pass_func = passwordInput;
    }

    login(loginData)
      .then((res) => {
        dispatch(userActions.login({ access_token: res.data.token }));
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                    {width > 767 ? (
                      <h3 className="display-4">LOGIN</h3>
                    ) : (
                      <img
                        style={{ alignSelf: "center", height: "auto" }}
                        src={logoverde}
                        alt="logo"
                      />
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitLogin();
                      }}
                    >
                      <div className="mb-3" htmlFor="num_func">
                        <input
                          id="num_func"
                          name="num_func"
                          type="text"
                          placeholder="Número Funcionário"
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                          required
                          value={userInput}
                          onChange={(e) => {
                            setUserInput(e.target.value);
                          }}
                        />
                      </div>
                      {isGestor && (
                        <div className="mb-3">
                          <div className="input-group">
                            <input
                              id="pass_func"
                              placeholder="Palavra-Passe"
                              type={passwordType}
                              onChange={(e) => {
                                setPasswordInput(e.target.value);
                              }}
                              value={passwordInput}
                              name="pass_func"
                              className="form-control rounded-pill border-0 shadow-sm px-4"
                              required={isGestor}
                              title="Este campo é obrigatório para gestores"
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
                      )}
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
                        <a
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(
                              (prevShowPassword) => !prevShowPassword
                            );
                            setIsGestor((prevIsGestor) => !prevIsGestor);
                          }}
                        >
                          {isGestor
                            ? "Se é operário, clique aqui"
                            : "Se é gestor, clique aqui"}
                        </a>
                      </div>
                    </form>
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
