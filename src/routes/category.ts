import { NextFunction, Request, Response, Router } from 'express';

import { CategoryController } from '../controllers/category';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../dtos/CategoryDTO';
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

categoryRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) return categoryController.findById(req, res, next);
  categoryController.get(req, res, next);
});

categoryRouter.put(
  '/',
  validator({
    schema: updateCategorySchema,
    type: QueryParams.BODY,
  }),
  categoryController.update,
);

categoryRouter.delete('/', categoryController.delete);
