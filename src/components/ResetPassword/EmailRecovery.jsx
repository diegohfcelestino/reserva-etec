import React, { useState } from "react";
import { FiAtSign } from "react-icons/fi";
import { useAuth } from "../../context/Auth";
import "./recoveryStyle.scss";

export default function EmailRecovery({ setOnReset }) {
  const [email, setEmail] = useState(null);
  const { resetPassword } = useAuth();

  function handleReset(e) {
    e.preventDefault();
    resetPassword(email, () => {
      setOnReset(false);
    });
  }

  return (
    <div className="reset">
      <div className="reset-form">
        <form onSubmit={handleReset} className="container">
          <h6>Informe seu e-mail</h6>
          <div className="mb-4  reset-input-group">
            <FiAtSign className="reset-icon" size="25px" color="#555555" />
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
          <div className="recovery-button">
            <button type="submit" className="btn btn-outline-primary">
              Enviar e-mail de redefinição
            </button>
          </div>
          <hr />
          <div id="emailHelp" className="form-text mt-3 text-center">
            <h5>
              Para entrar clique{" "}
              <span className="reset-password">
                <strong onClick={() => setOnReset(false)}>aqui</strong>
              </span>
              .
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}
