import { Router } from 'express';

import { UserController } from '../controllers/user';
import { createUserSchema, updateUserSchema } from '../dtos/UserDTO';
import { UserFactory } from '../factories/user';
import authMiddleware from '../middlewares/authentication';
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

userRouter.use(authMiddleware);

userRouter.get('/', userController.list);

userRouter.get('/:id', userController.findById);

userRouter.put(
  '/',
  validator({
    schema: updateUserSchema,
    type: QueryParams.BODY,
  }),
  userController.update,
);
userRouter.delete('/', userController.delete);
