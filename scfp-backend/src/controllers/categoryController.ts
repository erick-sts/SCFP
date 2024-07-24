import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { CategoryType } from '../models/categoryModel';

export class CategoryController {
  static async create(req: Request, res: Response) {
    const { name, type } = req.body;

    if (!Object.values(CategoryType).includes(type)) {
      return res.status(400).json({ message: 'Tipo de categoria inválido' });
    }

    try {
      const category = await CategoryService.create({ name, type: type as CategoryType });
      return res.status(201).json(category);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      return res.status(500).json({ message: 'Erro ao criar categoria' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Erro ao recuperar categorias:', error);
      return res.status(500).json({ message: 'Erro ao recuperar categorias' });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await CategoryService.getById(Number(id));
      if (!category) {
        return res.status(404).json({ message: 'Categoria não encontrada' });
      }
      return res.status(200).json(category);
    } catch (error) {
      console.error('Erro ao recuperar categoria:', error);
      return res.status(500).json({ message: 'Erro ao recuperar categoria' });
    }
  }
}
