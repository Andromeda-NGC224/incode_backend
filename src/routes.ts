import { Router } from 'express';
import { taskRouter } from 'task/task.routes';
import { userRouter } from 'user/user.routes';
import { authRouter } from 'auth/auth.routes';
import { accessTokenMiddleware } from 'auth/middlewares';

export const rootRouter = Router();

// feature routes
rootRouter.use('/auth', authRouter);
rootRouter.use('/tasks', accessTokenMiddleware, taskRouter);
rootRouter.use('/users', accessTokenMiddleware, userRouter);
