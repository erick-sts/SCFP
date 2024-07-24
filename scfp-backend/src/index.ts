import 'reflect-metadata';
import express from 'express'; 
import { createConnection } from 'typeorm'; 
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import userRoute from './routes/userRoute'
import authRoutes from './routes/authRoute'; 
import incomeRoutes from './routes/incomeRoute'; 
import expenseRoutes from './routes/expenseRoute'; 
import categoryRoute from './routes/categoryRoute';

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000; 

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET não está definido nas variáveis de ambiente');
  process.exit(1);
}

app.use(cors()); 

app.use(bodyParser.json());
app.use('/api/user', userRoute)
app.use('/api/auth', authRoutes); 
app.use('/api/income', incomeRoutes); 
app.use('/api/expense', expenseRoutes); 
app.use('/api/category', categoryRoute);

// Conexão com o banco de dados
createConnection().then(() => {
  console.log('Conectando com o Banco de Dados 🚀'); // Exibe mensagem de sucesso ao conectar com o banco de dados
  
  // Iniciando o servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 💻`); // Exibe mensagem de sucesso ao iniciar o servidor
  });
}).catch(error => console.log('Erro ao conectar com o banco de dados:', error)); // Exibe mensagem de erro se a conexão falhar
