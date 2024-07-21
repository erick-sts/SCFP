import { getRepository } from 'typeorm';
import { Expense } from '../models/expenseModel';
import { User } from '../models/userModel';

export class ExpenseService {
    // Método para criar uma nova despesa
    static async create(data: any, userId: number) {
        // Obtemos o repositório da entidade Expense
        const expenseRepository = getRepository(Expense);
        // Obtemos o repositório da entidade User
        const userRepository = getRepository(User);

        // Verificamos se o usuário existe
        const user = await userRepository.findOne({
            where: { id: userId } // Usamos um objeto de opções para encontrar o usuário
        });

        if (!user) {
            // Se o usuário não for encontrado, lançamos um erro
            throw new Error('Usuário não encontrado');
        }

        // Criamos uma nova entrada de despesa com os dados fornecidos e associamos ao usuário
        const expense = expenseRepository.create({ ...data, user });
        // Salvamos a nova despesa no banco de dados
        await expenseRepository.save(expense);

        // Retornamos uma resposta de sucesso
        return { status: 201, message: 'Entrada de despesa criada com sucesso!' };
    }

    // Método para obter todas as despesas de um usuário
    static async getAll(userId: number) {
        // Obtemos o repositório da entidade Expense
        const expenseRepository = getRepository(Expense);

        // Buscamos despesas relacionadas ao usuário
        const expenses = await expenseRepository.find({
            where: {
                user: { id: userId } // Usamos a associação com User para filtrar as despesas
            }
        });

        // Retornamos as despesas encontradas
        return expenses;
    }

    // Outros métodos CRUD podem ser adicionados aqui
}
