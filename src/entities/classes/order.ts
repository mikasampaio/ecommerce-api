import { IOrder, Items, OrderStatus } from '../interfaces/order';

export class Order {
  public _id?: string;
  public items: Items[];
  public orderStatus: OrderStatus;
  public user: string;
  public total: number | string;

  constructor({ _id, items, orderStatus, total, user }: IOrder) {
    this._id = _id;
    this.items = items;
    this.orderStatus = orderStatus;
    this.user = user;
    this.total = total;
  }
}
