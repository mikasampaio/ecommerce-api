import { IProduct, Variant } from '../interfaces/product';
import { Category } from './category';

export class Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  discount: number | null;
  category: Category | string;
  variants: Variant[];

  constructor({
    name,
    price,
    category,
    discount,
    description,
    variants,
    _id,
  }: IProduct) {
    this._id = _id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.discount = discount;
    this.category = new Category(category);
    this.variants = variants;
  }
}
