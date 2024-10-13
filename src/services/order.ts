import { StatusCodes } from 'http-status-codes';

import { OrderRepository } from '../database/repositories/order';
import { ProductRepository } from '../database/repositories/product';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/OrderDTO';
import { Order } from '../entities/classes/order';
import { ErrorMessage } from '../errors/errorMessage';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  async create({ products }: CreateOrderDTO) {
    products.map(async (product) => {
      const foundProduct = await this.productRepository.getById(
        product.product,
      );

      if (!foundProduct) {
        throw new ErrorMessage('Produto não encontrado', StatusCodes.NOT_FOUND);
      }

      // if (product.quantity > foundProduct.stock) {
      //   throw new Error('Quantidade do produto em estoque insuficiente');
      // }

      // foundProduct.stock -= product.quantity;
    });

    const order = new Order({ products });

    const createdOrder = await this.orderRepository.create(order);

    return createdOrder;
  }

  async get(): Promise<Order[]> {
    const orders = await this.orderRepository.get();

    return orders;
  }

  async getById(id: string): Promise<Order | undefined> {
    const foundOrder = await this.orderRepository.getById(id);

    return foundOrder;
  }

  async update(id: string, data: UpdateOrderDTO): Promise<Order | undefined> {
    const updatedCategory = await this.orderRepository.update(id, data);

    return updatedCategory;
  }

  async delete(id: string): Promise<Order | null> {
    return await this.orderRepository.delete(id);
  }
}