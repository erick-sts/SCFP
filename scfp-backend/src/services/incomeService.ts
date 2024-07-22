import { getRepository } from 'typeorm';
import { Income } from '../models/incomeModel';
import { User } from '../models/userModel';

export class IncomeService {
    // Método para criar uma nova entrada de receita
    static async create(data: { amount: number, description: string, category: string }, userId: number) {
        const incomeRepository = getRepository(Income);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const income = incomeRepository.create({ ...data, user });
        await incomeRepository.save(income);

        return { status: 201, message: 'Entrada de receita criada com sucesso!' };
    }

    // Método para obter todas as receitas de um usuário
    static async getAll(userId: number) {
        const incomeRepository = getRepository(Income);

        const incomes = await incomeRepository.find({
            where: { user: { id: userId } }
        });

        return incomes;
    }

    // Método para obter uma receita específica por ID
    static async getById(incomeId: number, userId: number) {
        const incomeRepository = getRepository(Income);

        const income = await incomeRepository.findOne({
            where: { id: incomeId, user: { id: userId } }
        });

        if (!income) {
            throw new Error('Receita não encontrada');
        }

        return income;
    }

    // Método para atualizar uma receita específica por ID
    static async update(incomeId: number, data: { amount?: number, description?: string, category?: string }, userId: number) {
        const incomeRepository = getRepository(Income);

        const income = await incomeRepository.findOne({
            where: { id: incomeId, user: { id: userId } }
        });

        if (!income) {
            throw new Error('Receita não encontrada');
        }

        // Atualiza os campos da receita com os dados fornecidos
        income.amount = data.amount ?? income.amount;
        income.description = data.description ?? income.description;
        income.category = data.category ?? income.category;

        await incomeRepository.save(income);

        return { status: 200, message: 'Receita atualizada com sucesso!' };
    }

    // Método para deletar uma receita específica por ID
    static async delete(incomeId: number, userId: number) {
        const incomeRepository = getRepository(Income);

        const income = await incomeRepository.findOne({
            where: { id: incomeId, user: { id: userId } }
        });

        if (!income) {
            throw new Error('Receita não encontrada');
        }

        await incomeRepository.remove(income);

        return { status: 200, message: 'Receita removida com sucesso!' };
    }
}
