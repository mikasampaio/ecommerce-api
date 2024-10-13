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

  async get(): Promise<Product[]> {
    const products = await this.productRepository.get();

    return products;
  }

  async getById(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new ErrorMessage('Produto não encontrado', StatusCodes.NOT_FOUND);
    }

    return product;
  }

  async update(
    id: string,
    product: UpdateProductDTO,
  ): Promise<Product | undefined> {
    const category = await this.categoryRepository.findById(
      product?.category as string,
    );

    if (!category) {
      throw new ErrorMessage('Categoria não existe', StatusCodes.NOT_FOUND);
    }

    const updatedProduct = await this.productRepository.update(id, {
      ...product,
      category,
    });

    if (!updatedProduct) {
      throw new ErrorMessage('Produto não encontrado', StatusCodes.NOT_FOUND);
    }

    return updatedProduct;
  }

  async delete(id: string): Promise<Product | null> {
    return await this.productRepository.delete(id);
  }
}
