import { Router } from 'express';

import { ProductController } from '../controllers/product';
import { createProductSchema } from '../dtos/ProductDTO';
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

productRouter.get('/', productController.list);
