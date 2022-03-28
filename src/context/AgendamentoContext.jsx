/* eslint-disable no-unused-vars */
import { hoursToMinutes } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/Auth";
// import { useItems } from './cadastros/ItemsContext'
//criar regra de administração de pagina

const AgendamentoContext = React.createContext();

export function useAgendamento() {
  return useContext(AgendamentoContext);
}

export function AgendamentoProvider({ children }) {
  const { user } = useAuth();
  const [selectedTipo, setSelectedTipo] = useState();
  const [selectedItem, setSelectedItem] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

  const dateMask = (value) => {
    const data = value.toString();
    const day = data.slice(8, 10);
    const month = data.slice(5, 7);
    const year = data.slice(0, 4);
    const dataCompleta = day + "/" + month + "/" + year;
    return dataCompleta;
  };

  function sqlToJsDate(sqlDate) {
    var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sDay = sqlDateArr1[2];
    return new Date(sYear, sMonth, sDay);
  }

  const getAgendamentos = async () => {
    const { data: agendamentos, error } = await supabase.from("agendamentos")
      .select(`
        *,
        items(description),
        tipos_item(name)
      `);
    setAgendamentos(agendamentos);
    console.log("agendamentos", agendamentos);
  };

  const getAgendamentosByTipo = async (tipo) => {
    const { data: agendamentos, error } = await supabase
      .from("agendamentos")
      .select(
        `
        *,
        items(description),
        tipos_item(name)
      `
      )
      .filter("id_tipo", "eq", tipo)
      .order("dt_inicio", { ascending: false });
    setAgendamentos(agendamentos);
  };

  const getAgendamentosByTipoData = async (tipo, data) => {
    const { data: agendamentos, error } = await supabase
      .from("agendamentos")
      .select(
        `
        *,
        items(description),
        tipos_item(name)
      `
      )
      .match({ id_tipo: tipo, dt_inicio: data });
    setAgendamentos(agendamentos);
  };

  async function insertAgendamento(agendamento) {
    const { data, error } = await supabase
      .from("agendamentos")
      .insert([agendamento]);

    if (error) {
      return alert("Erro ao agendar!");
    } else {
      getAgendamentosByTipo(parseInt(selectedTipo));
    }
  }

  async function checkDate(date) {
    const { data, error } = await supabase
      .from("agendamentos")
      .select(
        `
        *,
        items(description),
        tipos_item(name)
      `
      )
      .filter("id_tipo", "eq", 1)
      .eq("id_item", selectedItem);
    const salas = data.filter((sala) => sala.dt_inicio === date);

    setAgendamentos(salas);
  }

  useEffect(() => {
    getAgendamentos();
  }, []);

  const value = {
    selectedTipo,
    setSelectedTipo,
    selectedItem,
    setSelectedItem,
    insertAgendamento,
    agendamentos,
    getAgendamentos,
    setAgendamentos,
    getAgendamentosByTipo,
    getAgendamentosByTipoData,
    dateMask,
    checkDate,
    sqlToJsDate,
  };
  return (
    <AgendamentoContext.Provider value={value}>
      {children}
    </AgendamentoContext.Provider>
  );
}
