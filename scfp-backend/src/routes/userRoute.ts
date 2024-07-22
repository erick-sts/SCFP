import { Router } from 'express'; 
import { UserController } from '../controllers/userController'; 
import upload from '../middlewares/uploadMiddlewares'; 

const router = Router(); 

router.post('/', upload.single('photo'), UserController.register);

export default router; 