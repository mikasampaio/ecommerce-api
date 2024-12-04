import { NextFunction, Request, Response, Router } from 'express';

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

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.query.id) return userController.findById(req, res, next);
  userController.list(req, res, next);
});

userRouter.put(
  '/',
  validator({
    schema: updateUserSchema,
    type: QueryParams.BODY,
  }),
  userController.update,
);

userRouter.delete('/', userController.delete);

userRouter.get('/favorites', userController.getFavorites);

userRouter.put('/favorites', userController.updateFavorites);
