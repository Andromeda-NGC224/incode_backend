import { Router } from 'express';
import { TaskController } from './task.controller';
import { ParseIntSchema } from 'common/schemas';
import { validateMiddleware } from 'common/middleware';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  QueryParamsTaskSchema,
} from './task.schemas';

export const taskRouter = Router();

taskRouter.get(
  '/',
  validateMiddleware({ query: QueryParamsTaskSchema }),
  TaskController.getAll,
);

taskRouter.get(
  '/:id',
  validateMiddleware({ params: ParseIntSchema('id') }),
  TaskController.getById,
);

taskRouter.post(
  '/',
  validateMiddleware({ body: CreateTaskSchema }),
  TaskController.create,
);

taskRouter.patch(
  '/:id',
  validateMiddleware({ body: UpdateTaskSchema, params: ParseIntSchema('id') }),
  TaskController.update,
);

taskRouter.delete(
  '/:id',
  validateMiddleware({ params: ParseIntSchema('id') }),
  TaskController.delete,
);
