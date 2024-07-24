import { Router } from 'express';
import { IncomeController } from '../controllers/incomeController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Aplica o middleware de autenticação JWT a todas as rotas definidas a partir daqui
router.use(authenticateJWT);

router.post('/', IncomeController.create);

router.get('/', IncomeController.getAll);

router.get('/:id', IncomeController.getById);

router.put('/:id', IncomeController.update);

router.delete('/:id', IncomeController.delete);

export default router;
