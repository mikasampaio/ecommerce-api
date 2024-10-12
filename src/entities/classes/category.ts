import { ICategory } from '../interfaces/category';

export class Category {
  public _id?: string;
  public name: string;

  constructor({ _id, name }: ICategory) {
    this._id = _id;
    this.name = name;
  }
}
