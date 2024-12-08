import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/classes/category';
import { UserType } from '../entities/interfaces/common';
import { ErrorMessage } from '../errors/errorMessage';
import { CategoryService } from '../services/category';
import { UserService } from '../services/user';

export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  create = async (
    req: Request<unknown, unknown, CreateCategoryDTO> & {
      userId?: string;
      file?: Express.Multer.File;
    },
    res: Response<Category>,
    next: NextFunction,
  ) => {
    try {
      const id = req.userId;

      const { type } = await this.userService.findById(id as string);

      if (type !== UserType.ADMIN) {
        throw new ErrorMessage(
          'Usuário não possui permissão',
          StatusCodes.UNAUTHORIZED,
        );
      }

      const { name } = req.body;
      const { filename: image } = req.file as Express.Multer.File;

      const category = await this.categoryService.create({
        name,
        image,
      });

      res.status(StatusCodes.CREATED).json(category);
    } catch (err) {
      next(err);
    }
  };

  get = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.get();

      res.status(StatusCodes.OK).json(categories);
    } catch (err) {
      next(err);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;

      const category = await this.categoryService.findById(id as string);

      res.status(StatusCodes.OK).json(category);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request<{ id: string }, unknown, UpdateCategoryDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;

      const { name } = req.body;
      const { filename: image } = req.file as Express.Multer.File;

      const updatedCategory = await this.categoryService.update(id as string, {
        name,
        image,
      });

      res.status(StatusCodes.OK).json(updatedCategory);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.query;

      await this.categoryService.delete(id as string);

      res
        .status(StatusCodes.OK)
        .json({ message: 'Categoria deletado com sucesso' });
    } catch (err) {
      next(err);
    }
  };
}
