import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/classes/category';
import { CategoryService } from '../services/category';
import { BodyRequest } from './types';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  create = async (
    req: BodyRequest<CreateCategoryDTO>,
    res: Response<Category>,
    next: NextFunction,
  ) => {
    try {
      const { name } = req.body;

      const category = await this.categoryService.create({ name });

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

      const category = req.body;

      const updatedCategory = await this.categoryService.update(
        id as string,
        category,
      );

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
