import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Imagem from "../../assets/img/imagem"; importar imagem para usar como logo
import { FaSignOutAlt } from "react-icons/fa";

import "./navstyle.scss";
import { useNavbarContext } from "../../context/NavBarContext";
import { useAuth } from "../../context/Auth";
// import { useCursos } from "../../context/CursosContext";

const NewNav = () => {
  const { isHome } = useNavbarContext();
  // const { clearTipo } = useCursos()
  const { user, signOut } = useAuth();
  const [collapse, setCollapse] = useState(false);

  const isAdmin = user.user_metadata.isAdmin;
  async function handleSignOut() {
    //encerra a sessão do usuário
    await signOut();
  }

  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light"
      style={{ backgroundColor: "rgb(231, 230, 230)" }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler navbar-toggler-right dropdown"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => handleCollapse()}
        >
          <div className={collapse ? "hamburguer open" : "hamburguer"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        {/* <img
          className="navbar-brand"
          src={Imagem} usar a imagem de logo aqui.
          alt="Orgsystem"
          width="100"
        /> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isHome && (
              <>
                <li className="nav-item">
                  <Link
                    className={collapse ? "nav-link text" : "nav-link"}
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={collapse ? "nav-link text" : "nav-link"}
                    to="/agendamento"
                  >
                    Agendamento
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link
                      className={collapse ? "nav-link text" : "nav-link"}
                      to="/cadastros"
                    >
                      Cadastros
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={collapse ? "nav-link text" : "nav-link"}
                onClick={() => handleSignOut()}
                to="/"
              >
                <FaSignOutAlt /> Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NewNav;
