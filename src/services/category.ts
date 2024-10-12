import { StatusCodes } from 'http-status-codes';

import { CategoryRepository } from '../database/repositories/categories';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/classes/category';
import { ErrorMessage } from '../errors/errorMessage';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create({ name }: CreateCategoryDTO) {
    const foundCategory = await this.categoryRepository.findByName(name);

    if (foundCategory) {
      throw new ErrorMessage('Categoria já existe', StatusCodes.BAD_REQUEST);
    }

    const category = new Category({ name });

    const createdCategory = await this.categoryRepository.create(category);

    return createdCategory;
  }

  async get(): Promise<Category[]> {
    const categories = await this.categoryRepository.get();

    return categories;
  }

  async findById(id: string): Promise<Category | undefined> {
    const foundCategory = await this.categoryRepository.findById(id);

    return foundCategory;
  }

  async update(
    id: string,
    data: UpdateCategoryDTO,
  ): Promise<Category | undefined> {
    const foundCategory = await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new ErrorMessage('Categoria não encontrada', StatusCodes.NOT_FOUND);
    }

    const updatedCategory = await this.categoryRepository.update(id, data);

    return updatedCategory;
  }

  async delete(id: string): Promise<Category | null> {
    const foundCategory = await this.categoryRepository.findById(id);

    if (!foundCategory) {
      throw new ErrorMessage('Categoria não encontrada', StatusCodes.NOT_FOUND);
    }

    return await this.categoryRepository.delete(id);
  }
}
