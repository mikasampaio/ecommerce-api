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
}
