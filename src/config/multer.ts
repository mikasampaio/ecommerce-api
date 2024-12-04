import { extname, resolve } from 'node:path';

import multer from 'multer';
import { v4 } from 'uuid';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, filename, callback) => {
      return callback(null, v4() + extname(filename.originalname));
    },
  }),
};
