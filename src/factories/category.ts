import { CategoryRepository } from '../database/repositories/categories';
import { CategoryModel } from '../database/schemas/category';
import { CategoryService } from '../services/category';

export class CategoryFactory {
  private static categoryService: CategoryService;

  static getService() {
    if (this.categoryService) {
      return this.categoryService;
    }

    const repository = new CategoryRepository(CategoryModel);
    const service = new CategoryService(repository);

    this.categoryService = service;
    return service;
  }
}
