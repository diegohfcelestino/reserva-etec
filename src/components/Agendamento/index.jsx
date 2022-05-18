/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import { useAgendamento } from '../../context/AgendamentoContext'
import { useAuth } from '../../context/Auth'
import { useItems } from '../../context/ItemsContext'
import './agendamento.scss'

export default function Agendamento() {
  const {
    selectedTipo,
    setSelectedTipo,
    selectedItem,
    setSelectedItem,
    insertAgendamento,
    setAgendamentos,
    getAgendamentos,
    getAgendamentosByTipo,
    getAgendamentosByTipoData,
    checkDate
  } = useAgendamento()
  const { tiposAg } = useItems()

  const { user } = useAuth()
  const { items } = useItems()

  const dtInicioRef = useRef(new Date())
  const dtFimRef = useRef(new Date())
  const hrInicioRef = useRef('')
  const hrFimRef = useRef('')

  const [dtFim, setDtFim] = useState('')

  const [agendamento, setAgendamento] = useState({
    dt_inicio: Date(),
    dt_fim: Date(),
    hr_inicio: '',
    hr_final: '',
    id_user: '',
    id_item: '',
    id_tipo: ''
  })

  const handleSelect = async e => {
    setSelectedTipo(e.target.value)
    !e.target.value ? getAgendamentos() : getAgendamentosByTipo(e.target.value)
  }

  function saveAgendamento() {
    if (selectedTipo === '2') {
      const ag = { ...agendamento }
      ag.dt_inicio = dtInicioRef.current.value
      ag.dt_fim = dtFimRef.current.value
      ag.hr_final = hrFimRef.current.value
      ag.hr_inicio = hrInicioRef.current.value
      ag.id_tipo = parseInt(selectedTipo)
      ag.id_item = parseInt(selectedItem)
      ag.id_user = user.id
      ag.email = user.email
      ag.data = { name: user.user_metadata.name }
      insertAgendamento(ag)
      setAgendamento(ag)
    }
    if (selectedTipo === '1') {
      const ag = { ...agendamento }
      ag.dt_inicio = dtFim /* dtFimRef.current.value */
      ag.dt_fim = dtFim /* dtFimRef.current.value */
      ag.hr_final = hrFimRef.current.value
      ag.hr_inicio = hrInicioRef.current.value
      ag.id_tipo = parseInt(selectedTipo)
      ag.id_item = parseInt(selectedItem)
      ag.id_user = user.id
      ag.email = user.email
      ag.data = { name: user.user_metadata.name }
      setAgendamento(ag)
      insertAgendamento(ag)
    }
  }

  return (
    <div className="container-fluid mt-3 mb-3">
      <div className="container-fluid">
        {!selectedTipo && (
          <h5 className="lead text-center">
            Escolha o tipo de agendamento abaixo.
          </h5>
        )}
        <form>
          <div className="container-fluid justify-content-center col-12 row mb-3">
            <div className="col-auto">
              <label htmlFor="tipo" className="form-label">
                Tipo Agendamento
              </label>
              <select
                name="tipo"
                className="form-select"
                value={tiposAg.id}
                onChange={e => handleSelect(e)}
              >
                <option value="">Selecione</option>
                {tiposAg.map(tp => {
                  return (
                    <option key={tp.id} value={tp.id}>
                      {tp.name}
                    </option>
                  )
                })}
              </select>
            </div>
            {selectedTipo === '2' && (
              <>
                <div className="col-auto">
                  <label htmlFor="veiculo" className="form-label">
                    Veículo
                  </label>
                  <select
                    className="form-select"
                    name="veiculo"
                    value={selectedItem}
                    onChange={e => setSelectedItem(e.target.value)}
                  >
                    <option>Selecione</option>
                    {items
                      .filter(el => el.id_tipo === parseInt(selectedTipo))
                      .map(veiculo => {
                        return (
                          <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.description}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="data_inicio" className="form-label">
                    Data Inicio
                  </label>
                  <input
                    type="date"
                    name="data_inicio"
                    className="form-control"
                    ref={dtInicioRef}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="hora_inicio" className="form-label">
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    name="hora_inicio"
                    className="form-control"
                    ref={hrInicioRef}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="data_fim" className="form-label">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    name="data_fim"
                    className="form-control"
                    ref={dtFimRef}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="hora_fim" className="form-label">
                    Hora Fim
                  </label>
                  <input
                    type="time"
                    name="hora_fim"
                    className="form-control"
                    ref={hrFimRef}
                  />
                </div>
              </>
            )}
            {selectedTipo === '1' && (
              <>
                <div className="col-auto">
                  <label htmlFor="sala" className="form-label">
                    Sala
                  </label>
                  <select
                    className="form-select"
                    name="veiculo"
                    value={selectedItem.id}
                    onChange={e => setSelectedItem(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {items
                      .filter(el => el.id_tipo === parseInt(selectedTipo))
                      .map(sala => {
                        return (
                          <option key={sala.id} value={sala.id}>
                            {sala.description}
                          </option>
                        )
                      })}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="data" className="form-label">
                    Data
                  </label>
                  <input
                    type="date"
                    name="data_fim"
                    /*  ref={dtFimRef} */ className="form-control"
                    value={dtFim}
                    onChange={e => {
                      setDtFim(e.target.value)
                      checkDate(e.target.value)
                    }}
                  />
                </div>
                <div className="col-auto">
                  <label
                    htmlFor="hora_inicio"
                    ref={hrInicioRef}
                    className="form-label"
                  >
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    name="hora_inicio"
                    className="form-control"
                    ref={hrInicioRef}
                  />
                </div>
                <div className="col-auto">
                  <label htmlFor="hora_fim" className="form-label">
                    Hora Fim
                  </label>
                  <input
                    type="time"
                    name="hora_fim"
                    className="form-control"
                    ref={hrFimRef}
                  />
                </div>
              </>
            )}
          </div>
          {selectedTipo && (
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={e => {
                  e.preventDefault()
                  saveAgendamento()
                }}
              >
                Agendar
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="line mt-2"></div>
    </div>
  )
}
