import { getRepository } from 'typeorm';
import { Income } from '../models/incomeModel';
import { User } from '../models/userModel';

export class IncomeService {
    // Método para criar uma nova entrada de receita
    static async create(data: any, userId: number) {
        // Obtemos o repositório da entidade Income
        const incomeRepository = getRepository(Income);
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

        // Criamos uma nova entrada de receita com os dados fornecidos e associamos ao usuário
        const income = incomeRepository.create({ ...data, user });
        // Salvamos a nova receita no banco de dados
        await incomeRepository.save(income);

        // Retornamos uma resposta de sucesso
        return { status: 201, message: 'Entrada de receita criada com sucesso!' };
    }

    // Método para obter todas as receitas de um usuário
    static async getAll(userId: number) {
        // Obtemos o repositório da entidade Income
        const incomeRepository = getRepository(Income);

        // Buscamos receitas relacionadas ao usuário
        const incomes = await incomeRepository.find({
            where: {
                user: { id: userId } // Usamos a associação com User para filtrar as receitas
            }
        });

        // Retornamos as receitas encontradas
        return incomes;
    }

    // Outros métodos CRUD podem ser adicionados aqui
}
