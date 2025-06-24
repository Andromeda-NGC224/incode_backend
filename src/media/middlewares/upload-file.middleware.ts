import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

import { BadRequestException } from 'common/exceptions';

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const extension = file.originalname.split('.').pop()?.toLowerCase();

  if (extension === 'exe') {
    return callback(new BadRequestException('.exe file not allowed'));
  }

  callback(null, true);
};

export const uploadFilesMiddleware = multer({
  storage,
  fileFilter,
});
