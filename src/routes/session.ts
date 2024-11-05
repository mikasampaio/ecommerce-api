import { NextFunction, Request, Response, Router } from 'express';

import { SessionController } from '../controllers/session';
import { sessionSchema } from '../dtos/sessionDTO';
import { QueryParams, validator } from '../middlewares/validator';

export const sessionRouter = Router();

const sessionControler = new SessionController();

sessionRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return sessionControler.store(req, res, next);
  }

  validator({
    schema: sessionSchema,
    type: QueryParams.BODY,
  })(req, res, () => sessionControler.store(req, res, next));
});
