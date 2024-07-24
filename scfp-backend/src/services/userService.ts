import { getRepository } from 'typeorm';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';

export class UserService {
  static async register(name: string, email: string, password: string, photo?: Buffer) {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      return { status: 400, message: 'Usuário já existe!' };
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userRepository.create({ name, email, password: hashedPassword, photo });
      await userRepository.save(user);
      return { status: 201, message: 'Usuário criado com sucesso!' };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { status: 500, message: 'Erro interno do servidor.' };
    }
  }

 
}
