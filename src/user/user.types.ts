import { z } from 'zod';
import { CreateUserSchema, UpdateUserSchema } from './user.schemas';

// ! DTO
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
