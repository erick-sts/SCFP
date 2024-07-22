import { Request, Response } from 'express';
import { IncomeService } from '../services/incomeService';

export class IncomeController {
    static async create(req: Request, res: Response) {
        const { amount, description, category } = req.body;
        const userId = req.userId as number;

        if (!amount || !description || !category) {
            return res.status(400).json({ message: 'Valor, descrição e categoria são obrigatórios.' });
        }

        try {
            const response = await IncomeService.create({ description, amount,  category }, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao criar receita:', error);
            return res.status(500).json({ message: 'Erro ao criar receita' });
        }
    }

    static async getAll(req: Request, res: Response) {
        const userId = req.userId as number;

        try {
            const incomes = await IncomeService.getAll(userId);
            return res.status(200).json(incomes);
        } catch (error) {
            console.error('Erro ao recuperar receitas:', error);
            return res.status(500).json({ message: 'Erro ao recuperar receitas' });
        }
    }

    // Método para obter uma receita específica por ID
    static async getById(req: Request, res: Response) {
        const incomeId = parseInt(req.params.id, 10);
        const userId = req.userId as number;

        try {
            const income = await IncomeService.getById(incomeId, userId);
            return res.status(200).json(income);
        } catch (error) {
            console.error('Erro ao recuperar receita:', error);
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
    }

    // Método para atualizar uma receita específica por ID
    static async update(req: Request, res: Response) {
        const incomeId = parseInt(req.params.id, 10);
        const { amount, description, category } = req.body;
        const userId = req.userId as number;

        try {
            const response = await IncomeService.update(incomeId, { amount, description, category }, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
    }

    // Método para deletar uma receita específica por ID
    static async delete(req: Request, res: Response) {
        const incomeId = parseInt(req.params.id, 10);
        const userId = req.userId as number;

        try {
            const response = await IncomeService.delete(incomeId, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao remover receita:', error);
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
    }
}
