// incomeService.ts
import { getRepository } from 'typeorm';
import { Income } from '../models/incomeModel';
import { User } from '../models/userModel';
import { Category } from '../models/categoryModel';

export class IncomeService {
  static async create(data: { amount: number, description: string, categoryId: number }, userId: number) {
    const incomeRepository = getRepository(Income);
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    const user = await userRepository.findOne({ where: { id: userId } });
    const category = await categoryRepository.findOne({ where: { id: data.categoryId } });

    if (!user || !category) {
      throw new Error('Usuário ou categoria não encontrado');
    }

    const income = incomeRepository.create({ ...data, user, category });
    await incomeRepository.save(income);

    return { status: 201, message: 'Receita criada com sucesso!' };
  }

  static async getAll(userId: number) {
    const incomeRepository = getRepository(Income);

    const incomes = await incomeRepository.find({ where: { user: { id: userId } }, relations: ['category'] });
    return incomes;
  }

  static async getById(id: number, userId: number) {
    const incomeRepository = getRepository(Income);

    const income = await incomeRepository.findOne({ where: { id, user: { id: userId } }, relations: ['category'] });
    if (!income) {
      throw new Error('Receita não encontrada');
    }
    return income;
  }

  static async update(id: number, data: Partial<Income>, userId: number) {
    const incomeRepository = getRepository(Income);

    let income = await incomeRepository.findOne({ where: { id, user: { id: userId } }, relations: ['category'] });
    if (!income) {
      throw new Error('Receita não encontrada');
    }

    income = { ...income, ...data };
    await incomeRepository.save(income);

    return { status: 200, message: 'Receita atualizada com sucesso!' };
  }

  static async delete(id: number, userId: number) {
    const incomeRepository = getRepository(Income);

    const income = await incomeRepository.findOne({ where: { id, user: { id: userId } } });
    if (!income) {
      throw new Error('Receita não encontrada');
    }

    await incomeRepository.remove(income);

    return { status: 200, message: 'Receita removida com sucesso!' };
  }
}
