import { Router } from 'express';

import authMiddleware from '../middlewares/authentication';
import { baseRoutes } from './base.routes';
import { categoryRouter } from './category';
import { productRouter } from './product';
import { sessionRouter } from './session';
import { userRouter } from './user';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/session', sessionRouter);
routes.use('/user', userRouter);

routes.use(authMiddleware);

routes.use('/product', productRouter);
routes.use('/category', categoryRouter);
