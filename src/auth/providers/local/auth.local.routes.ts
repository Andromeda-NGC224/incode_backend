import { Router } from 'express';
import { validateMiddleware } from 'common/middleware';
import { LoginLocalSchema, RegisterLocalSchema } from './auth.local.schemas';
import { AuthLocalController } from './auth.local.controller';

export const authLocalRouter = Router();

authLocalRouter.post(
  '/login',
  validateMiddleware({ body: LoginLocalSchema }),
  AuthLocalController.login,
);

authLocalRouter.post(
  '/register',
  validateMiddleware({ body: RegisterLocalSchema }),
  AuthLocalController.register,
);
