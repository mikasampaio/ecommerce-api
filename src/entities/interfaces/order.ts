import { Status } from './common';
import { Size } from './product';

export interface Product {
  product?: string;
  quantity?: number;
  size?: Size;
  color?: string;
}

export interface IOrder {
  _id?: string;
  status?: Status;
  products: Product[];
}
