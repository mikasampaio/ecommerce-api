import { Status } from './common';

export interface ICategory {
  _id?: string;
  name: string;
  status?: Status;
}
