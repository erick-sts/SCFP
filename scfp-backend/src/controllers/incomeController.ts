// incomeController.ts
import { Request, Response } from 'express';
import { IncomeService } from '../services/incomeService';

export class IncomeController {
    static async create(req: Request, res: Response) {
        const { amount, description, categoryId } = req.body;
        const userId = req.userId as number;

        try {
            const response = await IncomeService.create({ amount, description, categoryId }, userId);
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

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId as number;

        try {
            const income = await IncomeService.getById(Number(id), userId);
            return res.status(200).json(income);
        } catch (error) {
            console.error('Erro ao recuperar receita:', error);
            return res.status(500).json({ message: 'Erro ao recuperar receita' });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const userId = req.userId as number;

        try {
            const response = await IncomeService.update(Number(id), data, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
            return res.status(500).json({ message: 'Erro ao atualizar receita' });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId as number;

        try {
            const response = await IncomeService.delete(Number(id), userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao remover receita:', error);
            return res.status(500).json({ message: 'Erro ao remover receita' });
        }
    }
}
