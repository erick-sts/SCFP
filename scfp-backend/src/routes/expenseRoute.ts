import { Router } from 'express'; // Importa o roteador do Express para definir as rotas
import { ExpenseController } from '../controllers/expenseController'; // Importa o controlador de despesas
import { authenticateJWT } from '../middlewares/authMiddleware'; // Importa o middleware de autenticação JWT

const router = Router(); // Cria uma instância do roteador

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

// Define a rota POST para criar uma nova despesa
router.post('/create', ExpenseController.create);

// Define a rota GET para obter todas as despesas do usuário
router.get('/all', ExpenseController.getAll);

// Outras rotas para CRUD (Create, Read, Update, Delete) de despesas podem ser adicionadas aqui

export default router; // Exporta o roteador para uso em outros módulos
