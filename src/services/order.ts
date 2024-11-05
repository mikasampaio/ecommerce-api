import { StatusCodes } from 'http-status-codes';

import { OrderRepository } from '../database/repositories/order';
import { ProductRepository } from '../database/repositories/product';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/OrderDTO';
import { Order } from '../entities/classes/order';
import { Items, OrderStatus } from '../entities/interfaces/order';
import { Size } from '../entities/interfaces/product';
import { ErrorMessage } from '../errors/errorMessage';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  async formattedItems(items: Items[]): Promise<
    {
      product: string;
      quantity: number;
      color: string;
      size: Size;
      discount: number;
      total: number;
    }[]
  > {
    return await Promise.all(
      items.map(async (item) => {
        const findProduct = await this.productRepository.getById(
          item.product as string,
        );

        if (!findProduct) {
          throw new ErrorMessage(
            'Produto não encontrado',
            StatusCodes.NOT_FOUND,
          );
        }

        const findVariants = await this.productRepository.getVariants(item);

        if (!findVariants) {
          throw new ErrorMessage(
            'Produto, estoque, cor ou tamanho inválido ou esgotado',
            StatusCodes.NOT_FOUND,
          );
        }

        const total =
          findProduct.price *
          item?.quantity *
          (1 - (findProduct.discount || 0));

        return {
          product: findVariants._id as string,
          quantity: item.quantity,
          color: item.color as string,
          size: item.size as Size,
          discount: findVariants.discount as number,
          total,
        };
      }),
    );
  }

  async create({
    items,
    orderStatus,
    user,
  }: CreateOrderDTO & { user: string }) {
    const formattedItems = await this.formattedItems(items);

    const order = new Order({
      items: formattedItems,
      orderStatus,
      user,
      total: formattedItems
        .reduce((acc, { total }) => acc + total, 0)
        .toFixed(2),
    });

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

  async update(
    id: string,
    { items, orderStatus }: UpdateOrderDTO,
  ): Promise<Order | undefined> {
    const foundOrder = await this.orderRepository.getById(id);

    if (!foundOrder) {
      throw new ErrorMessage('Pedido não encontrado', StatusCodes.NOT_FOUND);
    }

    let total: number | string = 0;

    if (items) {
      const formattedItems = await this.formattedItems(items);
      items = formattedItems;
      total = formattedItems
        .reduce((acc, { total }) => acc + total, 0)
        .toFixed(2);
    }

    const updatedCategory = await this.orderRepository.update(id, {
      items,
      orderStatus,
      total,
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<Order | null> {
    return await this.orderRepository.delete(id);
  }
}
