import { getRepository } from 'typeorm';
import { Expense } from '../models/expenseModel';
import { User } from '../models/userModel';

export class ExpenseService {
    // Método para criar uma nova despesa
    static async create(data: any, userId: number) {
        const expenseRepository = getRepository(Expense);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const expense = expenseRepository.create({ ...data, user });
        await expenseRepository.save(expense);

        return { status: 201, message: 'Entrada de despesa criada com sucesso!' };
    }

    // Método para obter todas as despesas de um usuário
    static async getAll(userId: number) {
        const expenseRepository = getRepository(Expense);

        const expenses = await expenseRepository.find({
            where: { user: { id: userId } }
        });

        return expenses;
    }

    // Método para obter uma despesa específica por ID
    static async getById(id: number, userId: number) {
        const expenseRepository = getRepository(Expense);

        const expense = await expenseRepository.findOne({
            where: { id, user: { id: userId } }
        });

        return expense;
    }

    // Método para atualizar uma despesa específica
    static async update(id: number, data: any, userId: number) {
        const expenseRepository = getRepository(Expense);

        const result = await expenseRepository.update(
            { id, user: { id: userId } },
            data
        );

        return result;
    }

    // Método para deletar uma despesa específica
    static async delete(id: number, userId: number) {
        const expenseRepository = getRepository(Expense);

        const result = await expenseRepository.delete({
            id,
            user: { id: userId }
        });

        return result;
    }
}
