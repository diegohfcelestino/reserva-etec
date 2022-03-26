import React from "react";
import { useHistory } from "react-router";
import Admin from "../../assets/icons/administrator-developer.svg";
import Car from "../../assets/icons/car.svg";
import ButtonMenu from "../../components/ButtonMenu";
import { useAuth } from "../../context/Auth";
import "../Home/style.scss";

const HomeCadastros = () => {
  const { user } = useAuth();
  const isAdmin = user.user_metadata.isAdmin;

  const history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <div className="home-container">
      {isAdmin ? (
        <>
          <h1>Selecione uma opção:</h1>
          <div className="button">
            <ButtonMenu onClick={() => handleClick("/cadastros-itens")}>
              <img src={Car} alt="Carros e Salas" />
              <p>Veículos/Salas</p>
            </ButtonMenu>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: "10rem",
          }}
        >
          <h1>Ooops... Você não tem acesso a essa área!</h1>
          <br />
          <img
            style={{ width: "8rem", height: "8rem" }}
            src={Admin}
            alt="Administrador"
          />
          <h1 className="lead mt-3">Entre em contato com o administrador.</h1>
        </div>
      )}
    </div>
  );
};

export default HomeCadastros;
