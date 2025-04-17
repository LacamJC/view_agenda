const {executarConsulta} = require('./conect');

const data = async() => {
    var data = await executarConsulta()
    var res = []
    var colaborador_lista = []
    
    data.forEach((registro) => {
      // console.log(registro)
      let data = formatarDataDDMM(registro.ZAF_DATA)
      let nome = registro.ZAF_COL.trim()
      let cliente = registro.ZAF_CLI.trim()

      let message = {
        colaborador : nome,
        dia : data,
        cliente : cliente
      }

      colaborador_lista.push(nome)
      res.push(message)
      // console.log(message)
    })

    let nomesUnicos = [... new Set(data.map((obj)=> obj.ZAF_COL.trim()))]



    const message = {
      colaboradores : nomesUnicos, 
      agendamentos : res
    }


    console.log(message)
    
};

data()









function formatarDataDDMM(dataString) {
  if (!dataString || dataString.length !== 8 || isNaN(parseInt(dataString))) {
    return null;
  }

  const ano = dataString.substring(0, 4);
  const mes = dataString.substring(4, 6);
  const dia = dataString.substring(6, 8);

  const dataJS = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));

  if (isNaN(dataJS.getTime())) { // Verifica se a data criada é válida
    return null;
  }

  const diaFormatado = String(dataJS.getDate()).padStart(2, '0');
  const mesFormatado = String(dataJS.getMonth() + 1).padStart(2, '0'); // Mês de 0-11, então adicionamos 1

  return `${diaFormatado}/${mesFormatado}`;
}

// // Exemplo de uso:
// const dataBancoFormatar = "20250417";
// const dataFormatada = formatarDataDDMM(dataBancoFormatar);

// if (dataFormatada) {
//   console.log(dataFormatada); // Saída: 17/04
// } else {
//   console.log("Formato de data inválido.");
// }