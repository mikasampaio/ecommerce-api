import { Category } from '../classes/category';
import { Status } from './common';

export enum Size {
  S = 'S', // Pequeno
  M = 'M', // Médio
  L = 'L', // Grande
  XL = 'XL', // Extra Grande
  XXL = 'XXL', // Duplo Extra Grande
}

export interface Stock {
  _id?: string;
  name?: string;
  quantity?: number;
  size?: Size[];
  discount?: number | null;
  color?: string[];
  path?: string[];
  description?: string;
  status?: Status;
}

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  category: Category;
  stock: Stock[];
}
