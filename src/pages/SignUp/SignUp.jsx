/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  FiAtSign,
  // FiFileText,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUser,
} from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { supabase } from "../../supabaseClient";
// import MaskedInput from "./MaskedInput";

function SignUp() {
  // const initialValues = {
  //   cpf: "",
  // };
  // const [values, setValues] = useState(initialValues);
  // function handleChange(event) {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // }

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUp } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    /* const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const cpf = cpfRef.current.value; */

    if (!email || !password || !name) {
      return toast.error("Favor preencha todos os campos!");
    } else {
      // Chama a função signUp do context
      const { error } = await signUp({ email, password });

      if (error) {
        return toast.error(error.message);
      } else {
        const { error } = await supabase.auth.update({
          data: { name: name, /* cpf: values.cpf, */ isAdmin: false },
        });
        if (error) {
          return toast.error(error.message, {
            onClose: () => history.push("/home"),
          });
        } else {
          // Redirect user to Dashboard
          return toast.success("Cadastro realizado. ", {
            onClose: () => history.push("/home"),
          });
        }
      }
    }
  }

  return (
    <>
      {/* <NavBar showButton={false} /> */}
      <div className="login">
        <div className="header"></div>

        <div className="container">
          <div className="d-flex justify-content-center align-content-center mb-3">
            <div
              className="row login-form" /* style={{ margin: 0, marginTop: 50, width: "40%" }} */
            >
              <form onSubmit={handleSubmit} className="container">
                <h6>Informe seu usuário e senha para acessar</h6>
                <div className="mb-4  loginInputGroup">
                  <FiUser className="loginIcon" size="25px" color="#555555" />
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    aria-describedby="nomeHelp"
                    value={name}
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className="mb-4  loginInputGroup">
                  <FiFileText
                    className="loginIcon"
                    size="25px"
                    color="#555555"
                  />

                  <MaskedInput
                    name="cpf"
                    mask="999.999.999-99"
                    value={values.cpf}
                    onChange={handleChange}
                    type="text"
                    id="cpf"
                    aria-describedby="cpfHelp"
                    placeholder="CPF"
                  />
                </div> */}
                <div className="mb-4  loginInputGroup">
                  <FiAtSign className="loginIcon" size="25px" color="#555555" />
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                  />
                </div>
                <div className="mb-3 loginInputGroup">
                  <FiLock className="loginIcon" size="25px" color="#555555" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-border"
                    id="senha"
                    name="password"
                    value={password}
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
                    Cadastrar
                  </button>
                </div>
                <div id="emailHelp" className="form-text mt-3 text-center">
                  <h5>
                    Para entrar clique <Link to="/">aqui</Link>.
                  </h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
