import { getRepository } from 'typeorm';
import { Category, CategoryType } from '../models/categoryModel';

export class CategoryService {
  static async create(data: { name: string; type: CategoryType }) {
    const categoryRepository = getRepository(Category);
    const newCategory = categoryRepository.create(data);
    return await categoryRepository.save(newCategory);
  }

  static async getAll() {
    const categoryRepository = getRepository(Category);
    return await categoryRepository.find();
  }

  static async getById(id: number) {
    const categoryRepository = getRepository(Category);
    return await categoryRepository.findOne({ where: { id } });
  }
}
