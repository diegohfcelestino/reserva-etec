import React, { useRef, useState } from "react";
// import "./recoveryStyle.scss"
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";

const RecoverPassword = ({ token, setRecoveryToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const newPasswordRef = useRef();

  const handleNewPassword = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    if (!newPassword) {
      return toast.error("A senha deve ter a partir de 6 dígitos");
    } else {
      const { error } = await supabase.auth.api
        .updateUser(token, {
          password: newPassword,
        })
        .then(toast.success("Senha Redefinida!"));

      if (!error) {
        setRecoveryToken(null);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="d-flex justify-content-center align-content-center mb-3">
        <div className="login-form text-center">
          <form className="container">
            <h3>Alteração de Senha</h3>
            <h6>
              <span className={"font-mono mr-1 text-red-400"}>*</span>Informe a
              nova senha:
            </h6>
            <div className="loginInputGroup">
              <FiLock className="loginIcon" size="25px" color="#555555" />
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-border"
                name="password"
                ref={newPasswordRef}
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
              <button
                onClick={handleNewPassword}
                type="button"
                className=" btn btn-outline-primary"
              >
                Alterar Senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
