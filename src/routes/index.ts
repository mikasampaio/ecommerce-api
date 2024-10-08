import { Router } from 'express';

import { baseRoutes } from './base.routes';
import { sessionRouter } from './session';
import { userRouter } from './user';

export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/session', sessionRouter);
routes.use('/user', userRouter);
