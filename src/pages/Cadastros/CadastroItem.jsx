import React, { useState } from "react";
import ItemsCadastro from "../../components/Cadastros/Items";
import { useItems } from "../../context/ItemsContext";

function CadastrosItems() {
  const { idTipo, setIdTipo } = useItems();
  const [salaClick, setSalaClick] = useState(false);
  const [VeiculoClick, setVeiculoClick] = useState(false);

  function setSala() {
    setSalaClick(true);
    setVeiculoClick(false);
    setIdTipo(1);
  }
  function setCarro() {
    setSalaClick(false);
    setVeiculoClick(true);
    setIdTipo(2);
  }

  return (
    <div className="cadastroContainer">
      <div className="selection">
        <button
          className={` ${salaClick && "active"}`}
          onClick={() => setSala()}
        >
          Sala
        </button>
        <button
          className={`${VeiculoClick && "active"}`}
          onClick={() => setCarro()}
        >
          Carro
        </button>
      </div>
      {idTipo !== 0 && (
        <span>
          <ItemsCadastro />
        </span>
      )}
    </div>
  );
}

export default CadastrosItems;
