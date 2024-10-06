import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodRawShape, z } from 'zod';

import { ErrorMessage } from '../errors/errorMessage';

export enum QueryParams {
  QUERY = 'query',
  BODY = 'body',
}

type ValidateParams = {
  schema: ZodRawShape;
  type: QueryParams;
};

export function validator(params: ValidateParams) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = z.object(params.schema).safeParse(req[params.type]);

    if (!result.success) {
      const errorFormatted = result.error.issues.map(
        (issue) => `${issue.path.join('.')}: ${issue.message}`,
      );

      throw new ErrorMessage(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY);
    }

    req[params.type] = result.data;

    next();
  };
}
