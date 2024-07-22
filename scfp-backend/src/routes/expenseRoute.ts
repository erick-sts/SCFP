import { Router } from 'express';
import { ExpenseController } from '../controllers/expenseController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

// Define a rota POST para criar uma nova despesa
router.post('/', ExpenseController.create);

// Define a rota GET para obter todas as despesas do usuário
router.get('/', ExpenseController.getAll);

// Define a rota GET para obter uma despesa específica por ID
router.get('/:id', ExpenseController.getById);

// Define a rota PUT para atualizar uma despesa específica por ID
router.put('/:id', ExpenseController.update);

// Define a rota DELETE para deletar uma despesa específica por ID
router.delete('/:id', ExpenseController.delete);

export default router;
