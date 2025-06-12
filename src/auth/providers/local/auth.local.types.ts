import { z } from 'zod';
import { LoginLocalSchema, RegisterLocalSchema } from './auth.local.schemas';

export type LoginLocalDto = z.infer<typeof LoginLocalSchema>;

export type RegisterLocalDto = z.infer<typeof RegisterLocalSchema>;
