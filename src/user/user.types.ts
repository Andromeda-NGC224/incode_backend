import { UserEntity } from './user.entity';
import {
  CreateUserSchema,
  UpdateUserSchema,
  QueryParamsUserSchema,
} from './user.schemas';
import { z } from 'zod';

export type UserSortableFields = UserEntity['email'][];

// ! DTO
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type QueryParamsUserDto = z.infer<typeof QueryParamsUserSchema>;
