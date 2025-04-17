require("dotenv").config()

const { Sequelize, QueryTypes } = require('sequelize');

// Configuração da conexão
const sequelize = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    dialect: 'mssql',
    host: 'localhost',
    port: process.env.BD_PORT, // Porta padrão do MS SQL Server
    dialectOptions: {
        options: {
            encrypt: false, // Para conexões seguras
            trustServerCertificate: false, // Se estiver usando um certificado autoassinado
        },
    },
    logging: false // Removi o console.log para não poluir ao importar
});

// Consulta SQL
const consultaSQL = `
    SELECT ZAF_COL, ZAF_CLI, ZAF_DATA
  FROM ZAF990 ZAF
`;



// Função para executar a consulta
async function executarConsulta() {
try{
    console.log('Conexão com o MS SQL Server estabelecida com sucesso.');

    const resultados = await sequelize.query(consultaSQL, {
        type: QueryTypes.SELECT
    });

    // Exibe o número de registros encontrados (mantive para feedback local)
    console.log(`Foram encontrados ${resultados.length} registros.`);

    return resultados;
} catch (erro) {
    console.error('Erro ao executar a consulta:', erro.message);
    throw erro;
} finally {
    // Fecha a conexão ao terminar
    if (sequelize) {
        // await sequelize.close();
        console.log('Conexão fechada.');
    }
}
}

// Exporta a função executarConsulta
module.exports = { executarConsulta };

// Bloco de execução principal (mantido para rodar o script diretamente)
if (require.main === module) {
    executarConsulta()
        .then(resultados => {
            // O que fazer com os resultados se o script for executado diretamente
            // console.log('Consulta executada com sucesso:', resultados);
            console.log("Consulta realizada com sucesso")
            console.log(Date())
            console.log("Registros: " + resultados.length)
        })
        .catch(erro => {
            console.error('Falha na execução:', erro);
            process.exit(1);
        });
}