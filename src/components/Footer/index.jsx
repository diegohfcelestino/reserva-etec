import React, { useCallback } from "react";
import { useAuth } from "../../context/Auth";

export default function Footer() {
  const { user } = useAuth();
  const data = user.user_metadata;
  const date = useCallback(() => {
    const dayList = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
    ];
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date();
    const dateFull = date.toLocaleDateString("pt-br", options);
    const dayWeek = date.getDay();
    const day = dayList[dayWeek];
    return `${day}, ${dateFull}`;
  }, []);

  return (
    <div className="footerContainer">
      <p className="footerText  text-muted">
        App desenvolvido pelo{" "}
        <a
          href="https://github.com/diegohfcelestino/reserva-etec"
          target="_blank"
          rel="noreferrer"
        >
          Grupo 06
        </a>{" "}
        da Etec
      </p>
      <p className="footerText">Usuário: {data.name}</p>
      <div className="footerText text-muted" title={date()}>
        {date()}
      </div>
    </div>
  );
}
