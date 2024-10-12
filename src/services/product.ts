import { StatusCodes } from 'http-status-codes';

import { CategoryRepository } from '../database/repositories/categories';
import { ProductRepository } from '../database/repositories/product';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/ProductDTO';
import { Product } from '../entities/classes/product';
import { ErrorMessage } from '../errors/errorMessage';

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const category = await this.categoryRepository.findById(data.category);

    if (!category) {
      throw new ErrorMessage('Categoria não existe', StatusCodes.NOT_FOUND);
    }

    const product = new Product({ ...data, category });

    const createdProduct = await this.productRepository.create(product);

    return createdProduct;
  }

  async list(): Promise<Product[]> {
    const products = await this.productRepository.list();

    return products;
  }

  async update(
    id: string,
    product: UpdateProductDTO,
  ): Promise<Product | undefined> {
    const updatedProduct = await this.productRepository.update(id, product);

    return updatedProduct;
  }

  async delete(id: string): Promise<Product | null> {
    return await this.productRepository.delete(id);
  }
}
