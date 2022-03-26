import React from "react";
import { useAgendamento } from "../../context/AgendamentoContext";
import { dateMask } from "../../services/helper";

import "./styles.scss";

const DataTable = ({ data }) => {
  const { selectedTipo } = useAgendamento();
  const itemRow = () => {
    if (selectedTipo === "2") {
      return <th>Veículo</th>;
    } else if (selectedTipo === "1") {
      return <th>Sala</th>;
    } else {
      return <th>Sala/Veículo</th>;
    }
  };
  return (
    <div className="table-responsive rolagem">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {selectedTipo === "2" || !selectedTipo ? (
              <th>Data Inicio</th>
            ) : (
              <th>Data</th>
            )}
            <th>Hora Início</th>
            {(selectedTipo === "2" || !selectedTipo) && <th>Data Fim</th>}
            <th>Hora Fim</th>
            <th>Responsável</th>
            {itemRow()}
          </tr>
        </thead>
        <tbody>
          {!data ? (
            <tr>
              <td>Nada a exibir</td>
            </tr>
          ) : (
            data.map((agendamento) => {
              return (
                <tr key={agendamento.id}>
                  <td>{dateMask(agendamento.dt_inicio)}</td>
                  <td>{agendamento.hr_inicio}</td>
                  {(selectedTipo === "2" || !selectedTipo) && (
                    <td>{dateMask(agendamento.dt_fim)}</td>
                  )}
                  <td>{agendamento.hr_final}</td>
                  <td>{agendamento.data?.name}</td>
                  <td>{agendamento.items.description}</td>
                </tr>
              );
            })
          )}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
