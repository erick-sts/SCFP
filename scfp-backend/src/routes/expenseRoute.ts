import { Router } from 'express';
import { ExpenseController } from '../controllers/expenseController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

router.post('/', ExpenseController.create);

router.get('/', ExpenseController.getAll);

router.get('/:id', ExpenseController.getById);

router.put('/:id', ExpenseController.update);

router.delete('/:id', ExpenseController.delete);

export default router;
