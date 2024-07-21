import 'reflect-metadata'; // Importa metadados necessários para o TypeORM
import express from 'express'; // Importa o framework Express para criar o servidor
import { createConnection } from 'typeorm'; // Importa a função para criar conexão com o banco de dados usando TypeORM
import bodyParser from 'body-parser'; // Importa middleware para processar o corpo das requisições
import dotenv from 'dotenv'; // Importa dotenv para carregar variáveis de ambiente
import authRoutes from './routes/authRoute'; // Importa as rotas de autenticação
import incomeRoutes from './routes/incomeRoute'; // Importa as rotas de receitas
import expenseRoutes from './routes/expenseRoute'; // Importa as rotas de despesas

// Configuração de variáveis de ambiente
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor, usando a variável de ambiente ou 5000 como padrão

// Verifique se o JWT_SECRET está definido
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET não está definido nas variáveis de ambiente');
  process.exit(1); // Encerra o processo se o JWT_SECRET não estiver definido
}

// Middlewares
app.use(bodyParser.json()); // Adiciona middleware para processar requisições JSON
app.use('/api/auth', authRoutes); // Define as rotas de autenticação
app.use('/api/income', incomeRoutes); // Define as rotas de receitas
app.use('/api/expense', expenseRoutes); // Define as rotas de despesas

// Conexão com o banco de dados
createConnection().then(() => {
  console.log('Conectando com o Banco de Dados 🚀'); // Exibe mensagem de sucesso ao conectar com o banco de dados
  
  // Iniciando o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 💻`); // Exibe mensagem de sucesso ao iniciar o servidor
  });
}).catch(error => console.log('Erro ao conectar com o banco de dados:', error)); // Exibe mensagem de erro se a conexão falhar
