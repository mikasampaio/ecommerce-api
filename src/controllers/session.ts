import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValid } from 'zod';

import { UserModel } from '../database/schemas/user';
import { sessionObject } from '../dtos/sessionDTO';
import { ErrorMessage } from '../errors/errorMessage';

export class SessionController {
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataIncorrect = () => {
        throw new ErrorMessage(
          'E-mail ou senha inválidos',
          StatusCodes.BAD_REQUEST,
        );
      };

      const isSessionValid = sessionObject.safeParse(req.body);

      if (!isSessionValid.success) {
        return dataIncorrect();
      }

      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return dataIncorrect();
      }

      const isSamePassword = await bcrypt.compare(password, user.password);

      if (!isSamePassword) {
        return dataIncorrect();
      }

      res.status(StatusCodes.OK).json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        status: user.status,
      });
    } catch (error) {
      next(error);
    }
  };
}
