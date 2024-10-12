import { Router } from 'express';

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

categoryRouter.get('/', categoryController.get);

categoryRouter.get('/:id', categoryController.findById);

categoryRouter.put(
  '/',
  validator({
    schema: updateCategorySchema,
    type: QueryParams.BODY,
  }),
  categoryController.update,
);
categoryRouter.delete('/', categoryController.delete);
