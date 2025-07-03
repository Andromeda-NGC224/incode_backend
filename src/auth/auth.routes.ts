import { Router } from 'express';
import { AuthController } from './auth.controller';
import { refreshTokenMiddleware } from 'auth/middlewares';
import { authLocalRouter } from './providers/local/auth.local.routes';

export const authRouter = Router();

// MAIN ROUTES
authRouter.get('/refresh', refreshTokenMiddleware, AuthController.refresh);
authRouter.post('/logout', AuthController.logout);

// LOCAL PROVIDER ROUTES
authRouter.use('/local', authLocalRouter);
