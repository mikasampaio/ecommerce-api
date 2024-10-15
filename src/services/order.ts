import { StatusCodes } from 'http-status-codes';

import { OrderRepository } from '../database/repositories/order';
import { ProductRepository } from '../database/repositories/product';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/OrderDTO';
import { Order } from '../entities/classes/order';
import { Items } from '../entities/interfaces/order';
import { ErrorMessage } from '../errors/errorMessage';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  async formattedItems(
    items: CreateOrderDTO['items'] | UpdateOrderDTO['items'],
  ) {
    if (items)
      return await Promise.all(
        items.map(async (item) => {
          const findProduct = await this.productRepository.getStock(item);

          if (!findProduct) {
            throw new ErrorMessage(
              'Produto, estoque, cor ou tamanho inválido ou esgotado',
              StatusCodes.NOT_FOUND,
            );
          }

          return {
            product: findProduct._id,
            quantity: item?.quantity,
            color: item?.color,
            size: item?.size,
            total:
              findProduct.price -
              (findProduct.stock.discount !== null
                ? findProduct.stock.discount
                : 0),
          };
        }),
      );
  }

  async create({
    items,
    orderStatus,
    user,
  }: CreateOrderDTO & { user: string }) {
    const formattedItems = (await this.formattedItems(items)) as Items[];

    const order = new Order({
      items: formattedItems,
      orderStatus,
      user,
      total: formattedItems.reduce(
        (acc, curr) => acc + (curr.total as number),
        0,
      ),
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

    if (items) {
      const formattedItems = await this.formattedItems(items);
      items = formattedItems;
    }

    const updatedCategory = await this.orderRepository.update(id, {
      items,
      orderStatus,
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<Order | null> {
    return await this.orderRepository.delete(id);
  }
}
