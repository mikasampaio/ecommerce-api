import { Router } from 'express';

import { CategoryController } from '../controllers/category';
import { createCategorySchema } from '../dtos/CategoryDTO';
import { CategoryFactory } from '../factories/category';
import { QueryParams, validator } from '../middlewares/validator';

export const categoryRouter = Router();

const categoryController = new CategoryController(CategoryFactory.getService());

categoryRouter.post(
  '/',
  validator({
    schema: createCategorySchema,
    type: QueryParams.BODY,
  }),
  categoryController.create,
);
