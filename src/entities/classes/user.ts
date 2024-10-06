import { UserType } from '../interfaces/common';
import { IUser } from '../interfaces/user';

export class User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  type: UserType;

  constructor({ email, password, firstName, lastName, type, _id }: IUser) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
