import { User } from '../../entities/classes/user';
import { IProduct } from '../../entities/interfaces/product';
import { IFavorite } from '../../entities/interfaces/user';
import { UserModel } from '../schemas/user';
export class UserRepository {
  constructor(private model: typeof UserModel) {}

  async create({
    firstName,
    lastName,
    email,
    password,
    type,
    favorites,
  }: User): Promise<User> {
    const createdUser = await this.model.create({
      firstName,
      lastName,
      email,
      password,
      type,
      favorites,
    });

    return createdUser.toObject<User>();
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.model.findOne({ email });

    return user?.toObject<User>();
  }

  async list(): Promise<User[]> {
    const users = await this.model.find();

    return users.map((user) => user.toObject<User>());
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.model.findById(id).exec();

    return user?.toObject<User>();
  }

  async update(
    id: string,
    updatedUser: Partial<User>,
  ): Promise<User | undefined> {
    const updated = await this.model.findByIdAndUpdate(
      id,
      { $set: { ...updatedUser, 'status.updatedAt': new Date() } },
      {
        new: true,
      },
    );

    return updated?.toObject<User>();
  }

  async delete(id: string): Promise<User | null> {
    const deletedUser = await this.model.findByIdAndDelete(id, {
      'status.deletedAt': new Date(),
    });

    return deletedUser;
  }

  async getFavorites(allFavorites: IFavorite[]): Promise<IFavorite[]> {
    return allFavorites;
  }

  async updateFavorites(
    userId: string,
    product: IProduct,
    isFavorited: boolean,
  ): Promise<User | undefined> {
    const updatedFavorite = await UserModel.findByIdAndUpdate(
      userId,
      isFavorited
        ? { $pull: { favorites: product._id } }
        : { $addToSet: { favorites: product._id } },
      { new: true },
    ).exec();

    return updatedFavorite?.toObject<User>();
  }
}
