import { Router } from 'express';

import { UserController } from '../controllers/user';
import { createUserSchema } from '../dtos/UserDTO';
import { UserFactory } from '../factories/user';
import { QueryParams, validator } from '../middlewares/validator';

export const userRouter = Router();

const userController = new UserController(UserFactory.getService());

userRouter.post(
  '/',
  validator({
    schema: createUserSchema,
    type: QueryParams.BODY,
  }),
  userController.create,
);

userRouter.get('/', userController.list);
