import { Order } from '../../entities/classes/order';
import { OrderModel } from '../schemas/order';

export class OrderRepository {
  constructor(private model: typeof OrderModel) {}

  async create(data: Order): Promise<Order> {
    const createdOrder = await this.model.create(data);

    return createdOrder.toObject<Order>();
  }

  async get(): Promise<Order[]> {
    const orders = await this.model.find();

    return orders.map((order) => order.toObject<Order>());
  }

  async getById(id: string): Promise<Order | undefined> {
    const order = await this.model.findById(id);

    return order?.toObject<Order>();
  }

  async update(
    id: string,
    updatedOrder: Partial<Order>,
  ): Promise<Order | undefined> {
    const updated = await this.model.findByIdAndUpdate(
      id,
      { $set: { ...updatedOrder, 'status.updatedAt': new Date() } },
      {
        new: true,
      },
    );

    return updated?.toObject<Order>();
  }

  async delete(id: string): Promise<Order | null> {
    const deletedOrder = await this.model.findByIdAndDelete(id, {
      'status.deletedAt': new Date(),
    });

    return deletedOrder;
  }
}
