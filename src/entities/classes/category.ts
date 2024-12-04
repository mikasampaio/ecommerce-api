import { ICategory } from '../interfaces/category';

export class Category {
  public _id?: string;
  public name: string;
  public image: string;

  constructor({ _id, name, image }: ICategory) {
    this._id = _id;
    this.name = name;
    this.image = image;
  }
}
