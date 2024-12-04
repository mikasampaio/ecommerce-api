import { Status, UserType } from './common';

export type IUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: UserType;
  favorites: string[];
  status?: Status;
};

export interface IFavorite {
  _id?: string;
  name: string;
  price: number;
  discount: number;
}
