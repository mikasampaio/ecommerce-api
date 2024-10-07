import { Router } from 'express';

import { SessionController } from '../controllers/session';
import { sessionSchema } from '../dtos/sessionDTO';
import { QueryParams, validator } from '../middlewares/validator';

export const sessionRouter = Router();

const sessionControler = new SessionController();

sessionRouter.post(
  '/',
  validator({
    schema: sessionSchema,
    type: QueryParams.BODY,
  }),
  sessionControler.store,
);
