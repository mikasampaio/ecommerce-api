import { Status } from './common';
import { Size } from './product';

export interface Items {
  product: string;
  quantity: number;
  size: Size;
  color: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
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
  total: number | string;
}
