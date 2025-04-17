import React, { useState, useEffect } from 'react';
import styles from './components/assets/scss/TabelaAgendamentos.module.css'
import data from './data.json'
function TabelaDeDuasSemanas() {
  // const [colaboradores, setColaboradores] = useState(['João Ramajo', 'Felipe Darc', 'Cleiton Henrique', 'Rodrigo salomão', 'Tiago fascina']);
  const [colaboradores, setColaboradores] = useState(data.colaboradores);


  const [agendamentos, setAgendamentos] = useState(data.agendamentos);
  const [dias, setDias] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({ colaborador: '', dia: '', cliente: '' }); // Novo agendamento sem 'das' e 'ate'
  const [exibirFormulario, setExibirFormulario] = useState(false);

  const jsonData = data





  useEffect(() => {
    gerarDiasDoMesAtual();
  }, []);

  const gerarDiasDoMesAtual = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
    const primeirosDiasDoMes = new Date(ano, mes, 1);
    const diasDoMes = [];

    for (let i = 0; i < ultimoDiaDoMes; i++) {
      const data = new Date(primeirosDiasDoMes);
      data.setDate(primeirosDiasDoMes.getDate() + i);
      const diaFormatado = data.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
      });
      const diaParaComparar = data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' });
      diasDoMes.push({ dataCompleta: data, formatado: diaFormatado, paraComparar: diaParaComparar });
    }
    setDias(diasDoMes);
  };

  const handleChangeNovoAgendamento = (event) => {
    const { name, value } = event.target;
    setNovoAgendamento({ ...novoAgendamento, [name]: value });
  };

  const adicionarNovoAgendamento = () => {
    setAgendamentos([...agendamentos, novoAgendamento]);
    setNovoAgendamento({ colaborador: '', dia: '', cliente: '' }); // Reseta o estado sem 'das' e 'ate'
    setExibirFormulario(false);
  };

  const encontrarAgendamentos = (dia, colaborador) => {
    return agendamentos.filter(
      (agendamento) => agendamento.dia === dia.paraComparar && agendamento.colaborador === colaborador
    );
  };

  return (
    <div className={styles.tabelaContainer}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th></th>
            {colaboradores.map((colaborador) => (
              <th key={colaborador}>{colaborador}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dias.map((dia) => (
            <tr key={dia.formatado}>
              <th><span>{dia.formatado}</span></th>
              {colaboradores.map((colaborador) => {
                const agendamentosDoDia = encontrarAgendamentos(dia, colaborador);
                return (
                  <td key={`${dia.formatado}-${colaborador}`}>
                    {agendamentosDoDia.map((agendamento, index) => (
                      <div key={index} className={styles.agendamentoItem}>
                        {agendamento.cliente} {/* Exibe apenas o nome do cliente */}
                      </div>
                    ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button onClick={() => setExibirFormulario(!exibirFormulario)} className={styles.botaoAgendamento}>
          {exibirFormulario ? 'Cancelar Agendamento' : 'Adicionar Agendamento'}
        </button> */}

      {/* {exibirFormulario && (
          <div className={styles.formularioContainer}>
            <h3>Novo Agendamento</h3>
            <label>
              Colaborador:
              <select
                name="colaborador"
                value={novoAgendamento.colaborador}
                onChange={handleChangeNovoAgendamento}
              >
                <option value="">Selecione</option>
                {colaboradores.map((colaborador) => (
                  <option key={colaborador} value={colaborador}>
                    {colaborador}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Dia:
              <select
                name="dia"
                value={novoAgendamento.dia}
                onChange={handleChangeNovoAgendamento}
              >
                <option value="">Selecione</option>
                {dias.map((dia) => (
                  <option key={dia.paraComparar} value={dia.paraComparar}>
                    {dia.formatado}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Cliente:
              <input
                type="text"
                name="cliente"
                value={novoAgendamento.cliente}
                onChange={handleChangeNovoAgendamento}
              />
            </label>
            <br />
            <button onClick={adicionarNovoAgendamento}>Salvar Agendamento</button>
          </div>
        )} */}
    </div>
  );
}

export default TabelaDeDuasSemanas;