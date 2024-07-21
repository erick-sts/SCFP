import { Request, Response } from 'express'; // Importa os tipos Request e Response do Express
import { getRepository } from 'typeorm'; // Importa a função getRepository do TypeORM para acessar o repositório do banco de dados
import { Expense } from '../models/expenseModel'; // Importa o modelo de despesa
import { User } from '../models/userModel'; // Importa o modelo de usuário

export class ExpenseController {
    // Método estático para criar uma nova despesa
    static async create(req: Request, res: Response) {
        const { amount, description } = req.body; // Desestruturação do corpo da requisição para obter o valor e a descrição
        const userId = req.userId; // Obtém o ID do usuário do middleware de autenticação

        // Verifica se os campos obrigatórios foram preenchidos
        if (!amount || !description) {
            return res.status(400).json({ message: 'O valor e a descrição são obrigatórios.' });
        }

        try {
            // Busca o usuário pelo ID fornecido
            const user = await getRepository(User).findOne({ where: { id: userId } });
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            // Cria uma nova instância de despesa com os dados fornecidos
            const expense = new Expense();
            expense.amount = amount;
            expense.description = description;
            expense.user = user;

            // Salva a despesa no banco de dados
            await getRepository(Expense).save(expense);
            return res.status(201).json(expense); // Retorna a despesa criada
        } catch (error) {
            console.error('Erro ao criar despesa:', error); // Log de erro
            return res.status(500).json({ message: 'Erro ao criar despesa' }); // Retorna uma mensagem de erro em caso de falha
        }
    }

    // Método estático para obter todas as despesas de um usuário
    static async getAll(req: Request, res: Response) {
        const userId = req.userId; // Obtém o ID do usuário do middleware de autenticação

        try {
            // Busca todas as despesas associadas ao usuário
            const expenses = await getRepository(Expense).find({ where: { user: { id: userId } } });
            return res.status(200).json(expenses); // Retorna a lista de despesas
        } catch (error) {
            console.error('Erro ao buscar despesas:', error); // Log de erro
            return res.status(500).json({ message: 'Erro ao buscar despesas' }); // Retorna uma mensagem de erro em caso de falha
        }
    }
}
