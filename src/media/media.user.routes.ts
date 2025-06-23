import { Router } from 'express';

import { UserAvatarController } from './media.user.controller';
import { uploadFilesMiddleware } from './middlewares';

export const mediaUserRouter = Router();

mediaUserRouter.post(
  '/avatar',
  uploadFilesMiddleware.single('avatar'),
  UserAvatarController.upload,
);

mediaUserRouter.patch(
  '/avatar',
  uploadFilesMiddleware.single('avatar'),
  UserAvatarController.update,
);
