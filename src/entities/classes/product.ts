import { IProduct, Size } from '../interfaces/product';
import { Category } from './category';

export class Product {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  category: Category;
  size: Size[];
  path?: string[];
  description?: string;
  color?: string[];
  discount?: number;

  constructor({
    name,
    price,
    quantity,
    size,
    category,
    color,
    description,
    discount,
    path,
    _id,
  }: IProduct) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
    this.category = new Category(category);
    this.color = color;
    this.description = description;
    this.discount = discount;
    this.path = path;
  }
}
