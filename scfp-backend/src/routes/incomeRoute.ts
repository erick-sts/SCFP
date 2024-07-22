import { Router } from 'express';
import { IncomeController } from '../controllers/incomeController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

// Define a rota POST para criar uma nova receita
router.post('/', IncomeController.create);

// Define a rota GET para obter todas as receitas do usuário
router.get('/', IncomeController.getAll);

// Define a rota GET para obter uma receita específica por ID
router.get('/:id', IncomeController.getById);

// Define a rota PUT para atualizar uma receita específica por ID
router.put('/:id', IncomeController.update);

// Define a rota DELETE para deletar uma receita específica por ID
router.delete('/:id', IncomeController.delete);

export default router;
