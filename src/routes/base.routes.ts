//* Index
import { Router } from 'express';

import packageJson from '../../package.json';

export const baseRoutes = Router();

baseRoutes.get('/', (_, res) => {
  const { name, author, version } = packageJson;

  res.status(200).json({ name, author, version });
});
