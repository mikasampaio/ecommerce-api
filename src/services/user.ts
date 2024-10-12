import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '../database/repositories/user';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/UserDTO';
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
    const foundUser = await this.userRepository.getByEmail(email);

    if (foundUser) {
      throw new ErrorMessage('Usuário já cadastrado', StatusCodes.BAD_REQUEST);
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      type,
    });

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }

  async list(): Promise<User[]> {
    const users = await this.userRepository.list();

    return users;
  }

  async update(id: string, user: UpdateUserDTO): Promise<User | undefined> {
    const updatedUser = await this.userRepository.update(id, user);

    return updatedUser;
  }

  async delete(id: string): Promise<User | null> {
    return await this.userRepository.delete(id);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ErrorMessage('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    return user;
  }
}
