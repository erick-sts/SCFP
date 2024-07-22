import { Request, Response } from 'express';
import { ExpenseService } from '../services/expenseService';

export class ExpenseController {
    // Método para criar uma nova despesa
    static async create(req: Request, res: Response) {
        const { amount, description, category } = req.body;
        const userIdString = req.userId; // Supondo que `userId` seja uma string

        if (!userIdString) {
            return res.status(400).json({ message: 'ID do usuário não fornecido' });
        }

        const userId = Number(userIdString); // Converte para número

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID do usuário inválido' });
        }

        try {
            const response = await ExpenseService.create({ description, amount,  category }, userId);
            return res.status(response.status).json({ message: response.message });
        } catch (error) {
            console.error('Erro ao criar despesa:', error);
            return res.status(500).json({ message: 'Erro ao criar despesa' });
        }
    }

    // Método para obter todas as despesas de um usuário
    static async getAll(req: Request, res: Response) {
        const userIdString = req.userId; // Supondo que `userId` seja uma string

        if (!userIdString) {
            return res.status(400).json({ message: 'ID do usuário não fornecido' });
        }

        const userId = Number(userIdString); // Converte para número

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID do usuário inválido' });
        }

        try {
            const expenses = await ExpenseService.getAll(userId);
            return res.status(200).json(expenses);
        } catch (error) {
            console.error('Erro ao recuperar despesas:', error);
            return res.status(500).json({ message: 'Erro ao recuperar despesas' });
        }
    }

    // Método para obter uma despesa específica por ID
    static async getById(req: Request, res: Response) {
        const { id } = req.params; // Extrai o ID da despesa da URL
        const userIdString = req.userId; // Supondo que `userId` seja uma string

        if (!userIdString) {
            return res.status(400).json({ message: 'ID do usuário não fornecido' });
        }

        const userId = Number(userIdString); // Converte para número
        const expenseId = Number(id); // Converte o ID da despesa para número

        if (isNaN(userId) || isNaN(expenseId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const expense = await ExpenseService.getById(expenseId, userId);
            if (expense) {
                return res.status(200).json(expense);
            } else {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao recuperar despesa:', error);
            return res.status(500).json({ message: 'Erro ao recuperar despesa' });
        }
    }

    // Método para atualizar uma despesa específica
    static async update(req: Request, res: Response) {
        const { id } = req.params; // Extrai o ID da despesa da URL
        const data = req.body; // Extrai dados da requisição
        const userIdString = req.userId; // Supondo que `userId` seja uma string

        if (!userIdString) {
            return res.status(400).json({ message: 'ID do usuário não fornecido' });
        }

        const userId = Number(userIdString); // Converte para número
        const expenseId = Number(id); // Converte o ID da despesa para número

        if (isNaN(userId) || isNaN(expenseId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const result = await ExpenseService.update(expenseId, data, userId);
            if (result.affected) {
                return res.status(200).json({ message: 'Despesa atualizada com sucesso!' });
            } else {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao atualizar despesa:', error);
            return res.status(500).json({ message: 'Erro ao atualizar despesa' });
        }
    }

    // Método para deletar uma despesa específica
    static async delete(req: Request, res: Response) {
        const { id } = req.params; // Extrai o ID da despesa da URL
        const userIdString = req.userId; // Supondo que `userId` seja uma string

        if (!userIdString) {
            return res.status(400).json({ message: 'ID do usuário não fornecido' });
        }

        const userId = Number(userIdString); // Converte para número
        const expenseId = Number(id); // Converte o ID da despesa para número

        if (isNaN(userId) || isNaN(expenseId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        try {
            const result = await ExpenseService.delete(expenseId, userId);
            if (result.affected) {
                return res.status(200).json({ message: 'Despesa deletada com sucesso!' });
            } else {
                return res.status(404).json({ message: 'Despesa não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao deletar despesa:', error);
            return res.status(500).json({ message: 'Erro ao deletar despesa' });
        }
    }
}
