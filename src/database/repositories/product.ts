import { Product } from '../../entities/classes/product';
import { ProductModel } from '../schemas/product';

export class ProductRepository {
  constructor(private model: typeof ProductModel) {}

  async create(data: Product): Promise<Product> {
    const createdProduct = await this.model.create(data);

    return createdProduct.toObject<Product>();
  }

  async list(): Promise<Product[]> {
    const products = await this.model.find();

    return products.map((product) => product.toObject<Product>());
  }

  async update(
    id: string,
    updatedProduct: Partial<Product>,
  ): Promise<Product | undefined> {
    const updated = await this.model.findByIdAndUpdate(
      id,
      { $set: { ...updatedProduct, 'status.updatedAt': new Date() } },
      {
        new: true,
      },
    );

    return updated?.toObject<Product>();
  }

  async delete(id: string): Promise<Product | null> {
    const deletedProduct = await this.model.findByIdAndDelete(id, {
      'status.deletedAt': new Date(),
    });

    return deletedProduct;
  }
}
