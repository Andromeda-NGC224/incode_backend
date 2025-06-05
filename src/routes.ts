import { Router } from 'express';
import { taskRouter } from 'task';

export const rootRouter = Router();

// feature routes
rootRouter.use('/task', taskRouter);
