import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import sessionConfig from '../config/session';
import { ErrorMessage } from '../errors/errorMessage';

interface CustomRequest extends Request {
  userId?: string;
}

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = /* req.headers.authorization; */ `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE1OTc2YjNmZmRkYjg3ZDRlODIyNjgiLCJpYXQiOjE3MzM0NDE1NzMsImV4cCI6MTczMzg3MzU3M30.Y9Plz8Yw_FV9qi1fJhHA3LQRIMPf_ijO6HKIK2WlceU`;

  if (!authHeader) {
    throw new ErrorMessage('Usuário não autenticado', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ').at(1);

  if (!token) {
    throw new ErrorMessage('Token inválido', StatusCodes.UNAUTHORIZED);
  }

  try {
    jwt.verify(token, sessionConfig.secret, (err, result) => {
      if (err) {
        throw new ErrorMessage('Token inválido', StatusCodes.UNAUTHORIZED);
      }

      req.userId = (result as JwtPayload)?._id as string;
    });
  } catch (error) {
    throw new ErrorMessage('Token inválido', StatusCodes.UNAUTHORIZED);
  }

  return next();
}
