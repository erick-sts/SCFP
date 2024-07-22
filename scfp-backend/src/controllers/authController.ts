import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    const response = await AuthService.login(email, password);
    if (response.token) {
      return res.json({ token: response.token });
    } else {
      return res.status(response.status).json({ message: response.message });
    }
  }

  static async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const response = AuthService.verifyToken(token);
    return res.status(response.status).json(response.status === 200 ? response.decoded : { message: response.message });
  }
}
