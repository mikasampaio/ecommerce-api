import { IProduct, Size, Stock } from '../interfaces/product';
import { Category } from './category';

export class Product {
  _id?: string;
  name: string;
  price: number;
  category: Category | string;
  stock: Stock[];

  constructor({ name, price, category, stock, _id }: IProduct) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.category = new Category(category);
    this.stock = stock;
  }
}
