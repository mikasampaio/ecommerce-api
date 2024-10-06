import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '../database/repositories/user';
import { CreateUserDTO } from '../dtos/UserDTO';
import { User } from '../entities/classes/user';
import { ErrorMessage } from '../errors/errorMessage';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create({
    firstName,
    lastName,
    email,
    password,
    type,
  }: CreateUserDTO): Promise<User> {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      type,
    });

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }

  async list(): Promise<User[]> {
    const users = await this.userRepository.list();

    return users;
  }
}
