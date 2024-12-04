import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';
import { CategoryController } from '../controllers/category';
import { categorySchema, updateCategorySchema } from '../dtos/CategoryDTO';
import { CategoryFactory } from '../factories/category';
import { UserFactory } from '../factories/user';
import { QueryParams, validator } from '../middlewares/validator';

export const categoryRouter = Router();
const upload = multer(multerConfig);

const categoryController = new CategoryController(
  CategoryFactory.getService(),
  UserFactory.getService(),
);

categoryRouter.post(
  '/',
  upload.single('image'),
  validator({
    schema: categorySchema,
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
