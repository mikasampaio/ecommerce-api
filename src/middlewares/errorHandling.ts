import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ErrorMessage } from '../errors/errorMessage';

export function errorHandler(
  error: Error | ErrorMessage,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (error instanceof ErrorMessage) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
}
