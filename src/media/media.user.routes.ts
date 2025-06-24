import { Router } from 'express';

import { MediaUserController } from './media.user.controller';
import { uploadFilesMiddleware } from './middlewares';

export const mediaUserRouter = Router();

mediaUserRouter.post(
  '/avatar',
  uploadFilesMiddleware.single('avatar'),
  MediaUserController.uploadUserMedia,
);

mediaUserRouter.patch(
  '/avatar',
  uploadFilesMiddleware.single('avatar'),
  MediaUserController.uploadUserMedia,
);
