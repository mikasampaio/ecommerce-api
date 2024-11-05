import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import authConfig from '../config/session';
import { UserModel } from '../database/schemas/user';
import { sessionObject } from '../dtos/sessionDTO';
import { ErrorMessage } from '../errors/errorMessage';

export class SessionController {
  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ').at(1);

      if (token) {
        const decoded = jwt.verify(token, authConfig.secret);
        const user = await UserModel.findById(
          (decoded as JwtPayload)._id as string,
        );

        if (!user)
          throw new ErrorMessage(
            'Usuário não encontrado',
            StatusCodes.NOT_FOUND,
          );

        res.status(StatusCodes.OK).json({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          status: user.status,
          token: jwt.sign({ _id: user._id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }

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
        token: jwt.sign({ _id: user._id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      next(error);
    }
  };
}
