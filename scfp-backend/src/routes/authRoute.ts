import { Router } from 'express'; // Importa o roteador do Express para definir as rotas
import { AuthController } from '../controllers/authController'; // Importa o controlador de autenticação
import upload from '../middlewares/uploadMiddlewares'; // Importa o middleware de upload

const router = Router(); // Cria uma instância do roteador

// Define a rota POST para registro de usuários
// Aplica o middleware de upload para processar o campo 'photo' do formulário
router.post('/register', upload.single('photo'), AuthController.register);

// Define a rota POST para login de usuários
router.post('/login', AuthController.login);

export default router; // Exporta o roteador para uso em outros módulos
