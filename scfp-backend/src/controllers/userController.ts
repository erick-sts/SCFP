import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {

  
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const photo = req.file?.buffer;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    const response = await UserService.register(name, email, password, photo);
    return res.status(response.status).json({ message: response.message });
  }

  
}
