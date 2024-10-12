import { Category } from '../classes/category';
import { Status } from './common';

export enum Size {
  S = 'S', // Pequeno
  M = 'M', // Médio
  L = 'L', // Grande
  XL = 'XL', // Extra Grande
  XXL = 'XXL', // Duplo Extra Grande
}

export interface IProduct {
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
  status?: Status;
}
