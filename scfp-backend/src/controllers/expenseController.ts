import { Request, Response } from 'express';
import { ExpenseService } from '../services/expenseService';

export class ExpenseController {
    static async create(req: Request, res: Response) {
        const { description, amount, categoryId } = req.body;
        const userId = req.userId as number;
        try {
            const response = await ExpenseService.create({description, amount, categoryId,}, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao criar despesa:', error);
            return res.status(500).json({ message: 'Erro ao criar despesa' });
        }
    }

    static async getAll(req: Request, res: Response) {
        const userId = req.userId as number;

        try {
            const expenses = await ExpenseService.getAll(userId);
            return res.status(200).json(expenses);
        } catch (error) {
            console.error('Erro ao recuperar despesas:', error);
            return res.status(500).json({ message: 'Erro ao recuperar despesas' });
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId as number;

        try {
            const expense = await ExpenseService.getById(Number(id), userId);
            return res.status(200).json(expense);
        } catch (error) {
            console.error('Erro ao recuperar despesa:', error);
            return res.status(500).json({ message: 'Erro ao recuperar despesa' });
        }
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;
        const userId = req.userId as number;

        try {
            const response = await ExpenseService.update(Number(id), data, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao atualizar despesa:', error);
            return res.status(500).json({ message: 'Erro ao atualizar despesa' });
        }
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.userId as number;

        try {
            const response = await ExpenseService.delete(Number(id), userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao remover despesa:', error);
            return res.status(500).json({ message: 'Erro ao remover despesa' });
        }
    }
}
