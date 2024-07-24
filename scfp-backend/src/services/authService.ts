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

    let photoBase64: string;

    try {
      if (user.photo) {
        if (Buffer.isBuffer(user.photo)) {
          photoBase64 = `data:image/png;base64,${user.photo.toString('base64')}`;
        } else {
          throw new Error('A propriedade photo não é um buffer.');
        }
      } else {
        photoBase64 = '/user.png';
      }
    } catch (error) {
      console.error('Erro ao converter foto para Base64:', error);
      photoBase64 = '/user.png';
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return {
      status: 200,
      token,
      user: {
        name: user.name,
        photo: photoBase64,
      },
    };
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      return { status: 200, decoded };
    } catch (error) {
      return { status: 401, message: 'Token inválido.' };
    }
  }
}
