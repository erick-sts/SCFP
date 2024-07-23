import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';

const router = Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

export default router;
