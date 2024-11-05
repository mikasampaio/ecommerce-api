import { Category } from '../classes/category';

export enum Size {
  PP = 'PP',
  P = 'P', // Pequeno
  M = 'M', // Médio
  G = 'G', // Grande
  GG = 'GG', // Extra Grande
  XG = 'XG', // Duplo Extra Grande
}

export interface Variant {
  name?: string;
  path?: string[];
  size: Size;
  quantity: number;
  color: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  discount: number | null;
  category: Category;
  description: string;
  variants: Variant[];
}
