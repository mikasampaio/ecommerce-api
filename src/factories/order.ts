import { OrderRepository } from '../database/repositories/order';
import { ProductRepository } from '../database/repositories/product';
import { OrderModel } from '../database/schemas/order';
import { ProductModel } from '../database/schemas/product';
import { OrderService } from '../services/order';

export class OrderFactory {
  private static orderService: OrderService;

  static getService() {
    if (this.orderService) {
      return this.orderService;
    }

    const repository = new OrderRepository(OrderModel);
    const productRepository = new ProductRepository(ProductModel);
    const service = new OrderService(repository, productRepository);

    this.orderService = service;
    return service;
  }
}
