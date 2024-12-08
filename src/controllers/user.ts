import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '../dtos/UserDTO';
import { User } from '../entities/classes/user';
import { ErrorMessage } from '../errors/errorMessage';
import { UserService } from '../services/user';
import { QueryRequest } from './types';

export class UserController {
  constructor(private userService: UserService) {}

  create = async (
    req: Request<unknown, unknown, CreateUserDTO>,
    res: Response<User>,
    next: NextFunction,
  ) => {
    try {
      const { firstName, lastName, email, password, type, favorites } =
        req.body;

      const user = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
        type,
        favorites: [],
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

  findById = async (req: Request, res: Response<User>, next: NextFunction) => {
    try {
      const { id } = req.query;

      const user = await this.userService.findById(id as string);

      res.status(StatusCodes.OK).json(user);
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

  getFavorites = async (
    req: QueryRequest<GetUserDTO> & { userId: string },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.userId;
      const { search } = req.query;
      const orders = await this.userService.getFavorites(userId as string, {
        search,
      });

      res.status(StatusCodes.OK).json(orders);
    } catch (err) {
      next(err);
    }
  };

  updateFavorites = async (
    req: Request<{ id: string }, unknown, unknown> & { userId?: string },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.userId;
      const { product } = req.query;

      const updatedOrder = await this.userService.updateFavorites(
        userId as string,
        product as string,
      );

      res.status(StatusCodes.OK).json(updatedOrder);
    } catch (err) {
      next(err);
    }
  };
}
