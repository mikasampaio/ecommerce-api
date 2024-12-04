import 'dotenv/config';
import { resolve } from 'node:path';

import cors from 'cors';
import express, { json } from 'express';

import { mongoConfig } from './database';
import { errorHandler } from './middlewares/errorHandling';
import { routes } from './routes';

const app = express();

mongoConfig().then(() => {
  app.use(cors());
  app.use(json());
  app.use(routes);
  app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
  app.use(errorHandler);

  app.listen(3333, () => {
    console.log('Server is running at port 3333');
  });
});
