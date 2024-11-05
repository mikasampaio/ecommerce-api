import { Router } from 'express';

import authMiddleware from '../middlewares/authentication';
import { baseRoutes } from './base.routes';
import { categoryRouter } from './category';
import { orderRouter } from './order';
import { productRouter } from './product';
import { sessionRouter } from './session';
import { userRouter } from './user';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/session', sessionRouter);
routes.use('/product', productRouter);

routes.use(authMiddleware);

routes.use('/user', userRouter);
routes.use('/category', categoryRouter);
routes.use('/order', orderRouter);
