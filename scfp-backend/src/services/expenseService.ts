import { getRepository } from 'typeorm';
import { Expense } from '../models/expenseModel';
import { User } from '../models/userModel';
import { Category } from '../models/categoryModel';

export class ExpenseService {
  static async create(data: { description: string, amount: number, categoryId: number }, userId: number) {
    const expenseRepository = getRepository(Expense);
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    const user = await userRepository.findOne({ where: { id: userId } });
    const category = await categoryRepository.findOne({ where: { id: data.categoryId } });

    if (!user || !category) {
      throw new Error('Usuário ou categoria não encontrado');
    }

    const expense = expenseRepository.create({ 
      description: data.description, 
      value: data.amount,
      category, 
      user 
    });
    console.log(expense.value)
    await expenseRepository.save(expense);

    return { status: 201, message: 'Despesa criada com sucesso!' };
  }

  static async getAll(userId: number) {
    const expenseRepository = getRepository(Expense);
    const expenses = await expenseRepository.find({ where: { user: { id: userId } }, relations: ['category'] });
    return expenses;
  }

  static async getById(id: number, userId: number) {
    const expenseRepository = getRepository(Expense);
    const expense = await expenseRepository.findOne({ where: { id, user: { id: userId } }, relations: ['category'] });
    if (!expense) {
      throw new Error('Despesa não encontrada');
    }
    return expense;
  }

  static async update(id: number, data: Partial<{ description: string, amount: number, categoryId: number }>, userId: number) {
    const expenseRepository = getRepository(Expense);
    const categoryRepository = getRepository(Category);

    let expense = await expenseRepository.findOne({ where: { id, user: { id: userId } }, relations: ['category'] });
    if (!expense) {
      throw new Error('Despesa não encontrada');
    }

    // Atualizar os campos da despesa
    if (data.description !== undefined) {
      expense.description = data.description;
    }
    if (data.amount !== undefined) {
      expense.value = data.amount;
    }
    if (data.categoryId !== undefined) {
      const category = await categoryRepository.findOne({ where: { id: data.categoryId } });
      if (!category) {
        throw new Error('Categoria não encontrada');
      }
      expense.category = category;
    }

    await expenseRepository.save(expense);

    return { status: 200, message: 'Despesa atualizada com sucesso!' };
  }

  static async delete(id: number, userId: number) {
    const expenseRepository = getRepository(Expense);

    const expense = await expenseRepository.findOne({ where: { id, user: { id: userId } } });
    if (!expense) {
      throw new Error('Despesa não encontrada');
    }

    await expenseRepository.remove(expense);

    return { status: 200, message: 'Despesa removida com sucesso!' };
  }
}
