import { z } from 'zod';
import { CreateUserSchema } from 'user/user.schemas';
import { EmailFieldSchema } from 'common/schemas';

const PasswordFieldSchema = z
  .string({ message: 'password is required' })
  .min(6, { message: 'min password length is 6' });

export const RegisterLocalSchema = CreateUserSchema.extend({
  password: PasswordFieldSchema,
}).strict({
  message: 'Register payload must not contain unknown fields',
});

export const LoginLocalSchema = z
  .object({
    email: EmailFieldSchema,
    password: PasswordFieldSchema,
  })
  .strict({
    message: 'Login payload must not contain unknown fields',
  });
