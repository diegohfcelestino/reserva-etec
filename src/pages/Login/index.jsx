import { useEffect, useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EmailRecovery from "../../components/ResetPassword/EmailRecovery";
import RecoverPassword from "../../components/ResetPassword/RecoverPassword";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [recoveryToken, setRecoveryToken] = useState(null);
  const [onReset, setOnReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const { signIn } = useAuth();

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email) {
      return toast.error("Informe seu usuário para continuar.");
    } else if (!password) {
      return toast.error("Informe sua senha para continuar.");
    } else {
      //chama a função signIn do contexto
      const { error } = await signIn({ email, password });

      if (error) {
        return toast.error(error.message);
      } else {
        history.push("/home");
      }
    }
  }

  useEffect(() => {
    const url = window.location.hash;
    const query = url.substr(1);
    let result = {};

    query.split("&").forEach((part) => {
      const item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result.type === "recovery") {
      setRecoveryToken(result.access_token);
    }
  }, []);

  return recoveryToken ? (
    <RecoverPassword
      token={recoveryToken}
      setRecoveryToken={setRecoveryToken}
    />
  ) : !onReset ? (
    <>
      <div className="login">
        <div className="header"></div>

        <div className="container">
          <div className="title"></div>
          <div className="d-flex justify-content-center align-content-center mb-3">
            <div className="row login-form">
              <form onSubmit={handleLogin} className="container">
                <h6>Informe seu usuário e senha para acessar</h6>
                <div className="mb-4  loginInputGroup">
                  <FiUser className="loginIcon" size="25px" color="#555555" />
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    placeholder="E-mail"
                  />
                </div>
                <div className="mb-3 loginInputGroup">
                  <FiLock className="loginIcon" size="25px" color="#555555" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-border"
                    name="password"
                    password={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                  />
                  <button
                    type="button"
                    color="blue"
                    className="show-password"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <FiEyeOff size="14pt" />
                    ) : (
                      <FiEye size="14pt" />
                    )}
                  </button>
                </div>
                <div className="loginButtonGroup">
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                </div>
                <div id="emailHelp" className="form-text mt-3 text-center">
                  <h5>
                    Para se cadastrar clique <Link to="/signUp">aqui</Link>.
                  </h5>
                </div>
              </form>
              <hr />
              <div
                id="passwordRecovery"
                className="form-text reset-password text-center"
              >
                <h5 onClick={() => setOnReset(true)}>Esqueceu a senha?</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <EmailRecovery setOnReset={setOnReset} />
    </>
  );
};
export default Login;
