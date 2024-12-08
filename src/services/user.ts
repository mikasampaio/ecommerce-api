import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import { UserRepository } from '../database/repositories/user';
import { ProductModel } from '../database/schemas/product';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '../dtos/UserDTO';
import { User } from '../entities/classes/user';
import { IProduct } from '../entities/interfaces/product';
import { IFavorite } from '../entities/interfaces/user';
import { ErrorMessage } from '../errors/errorMessage';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create({
    firstName,
    lastName,
    email,
    password,
    type,
    favorites,
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
      favorites,
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

  async getFavorites(
    userId: string,
    { search }: GetUserDTO,
  ): Promise<IFavorite[]> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ErrorMessage('Usuário não encontrado.', StatusCodes.NOT_FOUND);
    }

    const whereParams: Record<string, unknown> = {
      ...(search && { name: { $regex: search, $options: 'i' } }),
    };

    const allFavorites = (await ProductModel.find({
      _id: { $in: user.favorites },
      ...whereParams,
    }).exec()) as IFavorite[];

    return await this.userRepository.getFavorites(allFavorites);
  }

  async updateFavorites(userId: string, product: string) {
    const findProduct = await ProductModel.findById(product);

    if (!findProduct) {
      throw new ErrorMessage('Produto não existente', StatusCodes.NOT_FOUND);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ErrorMessage('Usuário não encontrado.', StatusCodes.NOT_FOUND);
    }

    const isFavorited = user.favorites.includes(product);

    const updatedFavorite = await this.userRepository.updateFavorites(
      userId,
      findProduct,
      isFavorited,
    );

    return updatedFavorite;
  }
}
