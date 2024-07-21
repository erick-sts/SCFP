import { Router } from 'express'; // Importa o roteador do Express para definir as rotas
import { IncomeController } from '../controllers/incomeController'; // Importa o controlador de receitas
import { authenticateJWT } from '../middlewares/authMiddleware'; // Importa o middleware de autenticação JWT

const router = Router(); // Cria uma instância do roteador

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

// Define a rota POST para criar uma nova receita
router.post('/create', IncomeController.create);

// Define a rota GET para obter todas as receitas do usuário
router.get('/all', IncomeController.getAll);

// Outras rotas para CRUD (Create, Read, Update, Delete) de receitas podem ser adicionadas aqui

export default router; // Exporta o roteador para uso em outros módulos
