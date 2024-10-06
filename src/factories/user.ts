import { UserRepository } from '../database/repositories/user';
import { UserModel } from '../database/schemas/user';
import { UserService } from '../services/user';

export class UserFactory {
  private static userService: UserService;

  static getService() {
    if (this.userService) {
      return this.userService;
    }

    const repository = new UserRepository(UserModel);
    const service = new UserService(repository);

    this.userService = service;
    return service;
  }
}
