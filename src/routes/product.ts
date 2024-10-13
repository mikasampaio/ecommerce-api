import { NextFunction, Request, Response, Router } from 'express';

import { ProductController } from '../controllers/product';
import { createProductSchema, updateProductSchema } from '../dtos/ProductDTO';
import { ProductFactory } from '../factories/product';
import { UserFactory } from '../factories/user';
import { QueryParams, validator } from '../middlewares/validator';

export const productRouter = Router();

const productController = new ProductController(
  ProductFactory.getService(),
  UserFactory.getService(),
);

productRouter.post(
  '/',
  validator({
    schema: createProductSchema,
    type: QueryParams.BODY,
  }),
  productController.create,
);

productRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) return productController.getById(req, res, next);
  productController.get(req, res, next);
});

productRouter.put(
  '/',
  validator({
    schema: updateProductSchema,
    type: QueryParams.BODY,
  }),
  productController.update,
);

productRouter.delete('/', productController.delete);
