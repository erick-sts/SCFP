import { getRepository } from 'typeorm';
import { Income } from '../models/incomeModel';
import { User } from '../models/userModel';
import { Category } from '../models/categoryModel';

export class IncomeService {
  static async create(data: { description: string, amount: number, categoryId: number }, userId: number) {
    console.log(data.description, data.amount, data.categoryId + ' chegou no service');

    const incomeRepository = getRepository(Income);
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    const user = await userRepository.findOne({ where: { id: userId } });
    const category = await categoryRepository.findOne({ where: { id: data.categoryId } });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Mapear 'amount' para 'value'
    const income = incomeRepository.create({ 
      description: data.description, 
      value: data.amount, 
      category, 
      user 
    });

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

  static async update(id: number, data: Partial<{ amount: number, description: string, categoryId: number }>, userId: number) {
    const incomeRepository = getRepository(Income);
    const categoryRepository = getRepository(Category);

    let income = await incomeRepository.findOne({ where: { id, user: { id: userId } }, relations: ['category'] });
    if (!income) {
      throw new Error('Receita não encontrada');
    }

    // Atualizar os campos do income
    if (data.amount !== undefined) {
      income.value = data.amount;
    }
    if (data.description !== undefined) {
      income.description = data.description;
    }
    if (data.categoryId !== undefined) {
      const category = await categoryRepository.findOne({ where: { id: data.categoryId } });
      if (!category) {
        throw new Error('Categoria não encontrada');
      }
      income.category = category;
    }

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
