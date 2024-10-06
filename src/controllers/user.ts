import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserModel } from '../database/schemas/user';
import { CreateUserDTO } from '../dtos/UserDTO';
import { ErrorMessage } from '../errors/errorMessage';
import { UserService } from '../services/user';

export class UserController {
  constructor(private userService: UserService) {}

  create = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { firstName, lastName, email, password, type } = req.body;

      const foundUser = await UserModel.findOne({ email });

      if (foundUser) {
        throw new ErrorMessage(
          'Usuário já cadastrado',
          StatusCodes.BAD_REQUEST,
        );
      }

      // if (password) {
      //   const hashedPassword = await bcrypt.hash(password, 10);
      //   req.body.password = hashedPassword;
      // }
      // console.log(password);

      const user = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
        type,
      });

      // RETORNANDO A RESPOSTA, APÓS A CRIAÇÃO
      return res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  };

  list = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.list();

      return res.status(StatusCodes.OK).json(users);
    } catch (err) {
      next(err);
    }
  };
}
