import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserModel } from '../database/schemas/user';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/UserDTO';
import { User } from '../entities/classes/user';
import { ErrorMessage } from '../errors/errorMessage';
import { UserService } from '../services/user';

export class UserController {
  constructor(private userService: UserService) {}

  create = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response<User>,
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

      const user = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
        type,
      });

      // RETORNANDO A RESPOSTA, APÓS A CRIAÇÃO
      res.status(StatusCodes.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  };

  list = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.list();

      const usersFormatted = users.map((user) => ({
        ...user,
        password: undefined,
      }));

      res.status(StatusCodes.OK).json(usersFormatted);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request<{ id: string }, unknown, UpdateUserDTO>,
    res: Response<User>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;
      const user = req.body;

      if (!id) {
        throw new ErrorMessage(
          'Id do usuário é obrigatório',
          StatusCodes.BAD_REQUEST,
        );
      }

      const updatedUser = await this.userService.update(id as string, user);

      if (!updatedUser) {
        throw new ErrorMessage('Usuário não encontrado', StatusCodes.NOT_FOUND);
      }

      res.status(StatusCodes.OK).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<unknown>,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;

      if (!id) {
        throw new ErrorMessage(
          'Id do usuário é obrigatório',
          StatusCodes.BAD_REQUEST,
        );
      }

      const deletedUser = await this.userService.delete(id as string);

      if (!deletedUser) {
        throw new ErrorMessage('Usuário não encontrado', StatusCodes.NOT_FOUND);
      }

      res
        .status(StatusCodes.OK)
        .send({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
      next(err);
    }
  };
}
