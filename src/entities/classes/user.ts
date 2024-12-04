import { UserType } from '../interfaces/common';
import { IUser } from '../interfaces/user';

export class User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  type: UserType;
  favorites: string[];

  constructor({
    email,
    password,
    firstName,
    lastName,
    type,
    favorites,
    _id,
  }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.type = type;
    this.favorites = favorites;
  }
}
