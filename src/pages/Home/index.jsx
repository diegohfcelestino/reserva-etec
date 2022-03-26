import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Calendar from "../../assets/icons/calendar-date.svg";
import Cadastrar from "../../assets/icons/online-form.svg";
import ButtonMenu from "../../components/ButtonMenu";
import { useAuth } from "../../context/Auth";
import { useNavbarContext } from "../../context/NavBarContext";
import "./style.scss";

export default function Home() {
  const { handleIsHome } = useNavbarContext();
  const { user } = useAuth();
  const isAdmin = user.user_metadata.isAdmin;

  let history = useHistory();

  function handleClick(path) {
    handleIsHome(false);
    history.push(path);
  }

  useEffect(() => {
    handleIsHome(true);
  }, [handleIsHome]);

  return (
    <div className="home-container">
      <h1>Selecione uma opção:</h1>
      <div className="button">
        <ButtonMenu onClick={() => handleClick("/agendamento")}>
          <img src={Calendar} alt="Agenda" />
          <p>Agendamento</p>
        </ButtonMenu>
        {isAdmin && (
          <ButtonMenu onClick={() => handleClick("/cadastros")}>
            <img src={Cadastrar} alt="Cadastrar" />
            <p>Cadastros</p>
          </ButtonMenu>
        )}

        {/* <ButtonMenu onClick={() => handleClick("/home")}>
          <img src={Config} alt="Configurações" />
          <p>Configurações</p>
        </ButtonMenu> */}
      </div>
    </div>
  );
}
