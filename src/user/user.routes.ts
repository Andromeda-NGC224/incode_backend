import { Router } from 'express';
import { UserController } from './user.controller';
import { ParseIntSchema } from 'common/schemas';
import { validateMiddleware } from 'common/middleware';
import {
  CreateUserSchema,
  UpdateUserSchema,
  QueryParamsUserSchema,
} from './user.schemas';

export const userRouter = Router();

userRouter.get(
  '/',
  validateMiddleware({ query: QueryParamsUserSchema }),
  UserController.getAll,
);

userRouter.get('/me', UserController.me);

userRouter.get(
  '/:id',
  validateMiddleware({ params: ParseIntSchema('id') }),
  UserController.getById,
);

userRouter.post(
  '/',
  validateMiddleware({ body: CreateUserSchema }),
  UserController.create,
);

userRouter.patch(
  '/:id',
  validateMiddleware({ body: UpdateUserSchema, params: ParseIntSchema('id') }),
  UserController.update,
);

userRouter.delete(
  '/:id',
  validateMiddleware({ params: ParseIntSchema('id') }),
  UserController.delete,
);
