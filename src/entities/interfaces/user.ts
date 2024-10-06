import { UserType } from './common';

export type IUser = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: UserType;
};
