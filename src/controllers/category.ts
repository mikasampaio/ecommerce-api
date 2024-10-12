import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CreateCategoryDTO } from '../dtos/CategoryDTO';
import { Category } from '../entities/classes/category';
import { CategoryService } from '../services/category';

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  create = async (
    req: Request<unknown, unknown, CreateCategoryDTO>,
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
}
