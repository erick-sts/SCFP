import { Request, Response } from 'express'; // Importa os tipos Request e Response do Express
import { getRepository } from 'typeorm'; // Importa a função getRepository do TypeORM para acessar o repositório do banco de dados
import { User } from '../models/userModel'; // Importa o modelo de usuário
import bcrypt from 'bcryptjs'; // Importa a biblioteca bcrypt para hash de senhas
import jwt from 'jsonwebtoken'; // Importa a biblioteca jwt para criação e verificação de tokens JWT

export class AuthController {
  // Método estático para registro de novos usuários
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body; // Desestruturação do corpo da requisição
    const photo = req.file?.buffer; // Obtém o buffer do arquivo de foto, se enviado
    const userRepository = getRepository(User); // Obtém o repositório de usuários

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Verifica se o usuário já existe pelo email
    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe!' });
    }

    try {
      // Hash da senha usando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      // Cria uma nova instância de usuário com os dados fornecidos
      const user = userRepository.create({ name, email, password: hashedPassword, photo });
      // Salva o novo usuário no banco de dados
      await userRepository.save(user);

      return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error); // Log de erro
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  // Método estático para login de usuários
  static async login(req: Request, res: Response) {
    const { email, password } = req.body; // Desestruturação do corpo da requisição
    const userRepository = getRepository(User); // Obtém o repositório de usuários

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Verifica se o usuário existe pelo email
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se a senha fornecida é válida
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera um token JWT com o ID do usuário
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return res.json({ token }); // Retorna o token JWT para o cliente
  }
}
