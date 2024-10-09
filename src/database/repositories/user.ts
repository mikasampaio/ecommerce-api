import { User } from '../../entities/classes/user';
import { UserModel } from '../schemas/user';
export class UserRepository {
  constructor(private model: typeof UserModel) {}

  async create({
    firstName,
    lastName,
    email,
    password,
    type,
  }: User): Promise<User> {
    const createdUser = await this.model.create({
      firstName,
      lastName,
      email,
      password,
      type,
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

  async update(id: string, updatedUser: User): Promise<User | undefined> {
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
}
