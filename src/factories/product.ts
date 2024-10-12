import { CategoryRepository } from '../database/repositories/categories';
import { ProductRepository } from '../database/repositories/product';
import { CategoryModel } from '../database/schemas/category';
import { ProductModel } from '../database/schemas/product';
import { ProductService } from '../services/product';

export class ProductFactory {
  private static productService: ProductService;

  static getService() {
    if (this.productService) {
      return this.productService;
    }

    const repositoryProduct = new ProductRepository(ProductModel);
    const repositoryCategory = new CategoryRepository(CategoryModel);
    const service = new ProductService(repositoryProduct, repositoryCategory);

    this.productService = service;
    return service;
  }
}
