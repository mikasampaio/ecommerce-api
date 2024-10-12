import { StatusCodes } from 'http-status-codes';

import { CategoryRepository } from '../database/repositories/categories';
import { CreateCategoryDTO } from '../dtos/CategoryDTO';
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
}
