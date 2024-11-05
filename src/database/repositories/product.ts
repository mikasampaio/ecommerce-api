import mongoose, { ObjectId } from 'mongoose';

import { UpdateProductDTO } from '../../dtos/ProductDTO';
import { Product } from '../../entities/classes/product';
import { Items } from '../../entities/interfaces/order';
import { ProductModel } from '../schemas/product';
export class ProductRepository {
  constructor(private model: typeof ProductModel) {}

  async create(data: Product): Promise<Product> {
    const createdProduct = await this.model.create(data);

    return createdProduct.toObject<Product>();
  }

  async get(): Promise<Product[]> {
    const products = await this.model.find();

    return products.map((product) => product.toObject<Product>());
  }

  async getById(id: string): Promise<Product | undefined> {
    const product = await this.model.findById(id);

    return product?.toObject<Product>();
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

  async getVariants({
    color,
    product,
    quantity,
    size,
  }: Items): Promise<Product> {
    const aggregate = this.model.aggregate();

    const [result] = await aggregate
      .match({
        _id: new mongoose.Types.ObjectId(product),
      })
      .unwind({
        path: '$variants',
      })
      .match({
        'variants.size': size,
        'variants.quantity': { $gte: quantity },
        'variants.color': color,
      })
      .project({
        price: 1,
        discount: 1,
      });

    return result;
  }
}
