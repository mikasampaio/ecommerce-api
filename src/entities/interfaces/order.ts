import { Status } from './common';
import { Size } from './product';

export interface Items {
  product?: string;
  stock?: number;
  quantity?: number;
  size?: Size;
  color?: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESING = 'PROCESING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface IOrder {
  _id?: string;
  status?: Status;
  orderStatus: OrderStatus;
  items: Items[];
  user: string;
}
