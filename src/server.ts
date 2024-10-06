import 'dotenv/config';
import express, { json } from 'express';

import { mongoConfig } from './database';
import { errorHandler } from './middlewares/errorHandling';
import { routes } from './routes';

mongoConfig().then(() => {
  const app = express();

  app.use(json());
  app.use(routes);
  app.use(errorHandler);

  app.listen(3333, () => {
    console.log('Server is running at port 3333');
  });
});
