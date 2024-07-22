import { getRepository } from 'typeorm';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async login(email: string, password: string) {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return { status: 404, message: 'Usuário não encontrado.' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { status: 401, message: 'Credenciais inválidas' };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return { status: 200, token };
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return { status: 200, decoded };
    } catch (error) {
      return { status: 401, message: 'Token inválido.' };
    }
  }
}
