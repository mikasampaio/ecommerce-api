import { NextFunction, Request, Response, Router } from 'express';

import { OrderController } from '../controllers/order';
import { orderSchema, updateOrderSchema } from '../dtos/OrderDTO';
import { OrderFactory } from '../factories/order';
import { UserFactory } from '../factories/user';
import { QueryParams, validator } from '../middlewares/validator';

export const orderRouter = Router();

const orderController = new OrderController(
  OrderFactory.getService(),
  UserFactory.getService(),
);

orderRouter.post(
  '/',
  validator({
    schema: orderSchema,
    type: QueryParams.BODY,
  }),
  orderController.create,
);

orderRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) return orderController.getById(req, res, next);
  orderController.get(req, res, next);
});

orderRouter.put(
  '/',
  validator({
    schema: updateOrderSchema,
    type: QueryParams.BODY,
  }),
  orderController.update,
);

orderRouter.delete('/', orderController.delete);
