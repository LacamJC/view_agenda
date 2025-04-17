
import React, { useState, useEffect } from 'react';
import styles from './components/assets/scss/TabelaAgendamentos.module.css'
import data from './data.json'
import axios from 'axios'

const URL = process.env.REACT_APP_ENDPOINT_DE_DADOS
const TOKEN = process.env.REACT_APP_API_KEY
function TabelaDeDuasSemanas() {
  // const [colaboradores, setColaboradores] = useState(['João Ramajo', 'Felipe Darc', 'Cleiton Henrique', 'Rodrigo salomão', 'Tiago fascina']);
  const [colaboradores, setColaboradores] = useState(data.colaboradores);
  const [agendamentos, setAgendamentos] = useState(data.agendamentos);
  const [isLoading, setIsLoading] = useState(true);
  const [dias, setDias] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({ colaborador: '', dia: '', cliente: '' }); // Novo agendamento sem 'das' e 'ate'
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [apiData, setApiData] = useState()



  useEffect(() => {
    gerarDiasDoMesAtual();

    const fetchData = async () => {
      setIsLoading(true)
      try {

        const response = await axios.get(`${URL}/`, {
          headers: {
            'api_key': `${TOKEN}`
          }
        })
        const data = response.data
        if (data) {
          setIsLoading(false)
          // console.log(apiData)
          setAgendamentos(data.agendamentos)
          console.log('Dados recebidos da api')
        }

      } catch (err) {
        setAgendamentos(data.agendamentos)
        console.log('dados truncados')
        console.log(err)
      }
    }
    fetchData()
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
    </div>
  );

}

export default TabelaDeDuasSemanas;