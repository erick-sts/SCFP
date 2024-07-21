import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Income } from '../models/incomeModel';
import { User } from '../models/userModel';

export class IncomeController {
    // Método estático para criar uma nova receita
    static async create(req: Request, res: Response) {
        const { amount, description } = req.body; // Extrai os valores de 'amount' e 'description' do corpo da requisição
        const userId = req.userId; // Obtém o ID do usuário a partir do middleware de autenticação

        console.log('Corpo da requisição:', req.body); // Log do corpo da requisição para depuração
        console.log('ID do usuário da requisição:', userId); // Log do ID do usuário para depuração

        // Verifica se 'amount' e 'description' foram fornecidos
        if (!amount || !description) {
            console.log('Valor ou descrição faltando'); // Log para depuração
            return res.status(400).json({ message: 'Valor e descrição são obrigatórios.' }); // Resposta com erro se algum dos campos estiver faltando
        }

        try {
            // Busca o usuário no banco de dados com base no ID fornecido
            const user = await getRepository(User).findOne({ where: { id: userId } });
            if (!user) {
                console.log('Usuário não encontrado'); // Log para depuração
                return res.status(404).json({ message: 'Usuário não encontrado' }); // Resposta com erro se o usuário não for encontrado
            }

            // Cria uma nova instância do modelo Income
            const income = new Income();
            income.amount = amount; // Define o valor da receita
            income.description = description; // Define a descrição da receita
            income.user = user; // Associa a receita ao usuário

            // Salva a nova receita no banco de dados
            await getRepository(Income).save(income);
            console.log('Receita criada:', income); // Log para depuração
            res.status(201).json(income); // Responde com a receita criada e o status 201 (Criado)
        } catch (error) {
            console.log('Erro ao criar receita:', error); // Log do erro para depuração
            res.status(500).json({ message: 'Erro ao criar receita' }); // Resposta com erro interno do servidor
        }
    }

    // Método estático para obter todas as receitas de um usuário
    static async getAll(req: Request, res: Response) {
        const userId = req.userId; // Obtém o ID do usuário a partir do middleware de autenticação

        console.log('ID do usuário da requisição:', userId); // Log do ID do usuário para depuração

        try {
            // Busca todas as receitas associadas ao usuário
            const incomes = await getRepository(Income).find({ where: { user: { id: userId } } });
            console.log('Receitas recuperadas:', incomes); // Log das receitas recuperadas para depuração
            res.status(200).json(incomes); // Responde com a lista de receitas e o status 200 (OK)
        } catch (error) {
            console.log('Erro ao recuperar receitas:', error); // Log do erro para depuração
            res.status(500).json({ message: 'Erro ao recuperar receitas' }); // Resposta com erro interno do servidor
        }
    }
}
