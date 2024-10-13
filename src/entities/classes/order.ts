import { IOrder, Product } from '../interfaces/order';

export class Order {
  public _id?: string;
  public products: Product[];

  constructor({ _id, products }: IOrder) {
    this._id = _id;
    this.products = products;
  }
}
