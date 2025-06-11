import { Router } from 'express';
import { taskRouter } from 'task';
import { userRouter } from 'user';

export const rootRouter = Router();

// feature routes
rootRouter.use('/task', taskRouter);
rootRouter.use('/user', userRouter);
