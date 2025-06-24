import { z } from 'zod';
import { EmailFieldSchema, getQueryParamsDtoSchema } from 'common/schemas';
import { UserEntity } from 'user/user.entity';

export const CreateUserSchema = z
  .object(
    {
      email: EmailFieldSchema,
      name: z
        .string({ message: 'name should be a string' })
        .nonempty({ message: 'name should not be empty' })
        .optional(),
      surname: z
        .string({ message: 'surname should be a string' })
        .nonempty({ message: 'surname should not be empty' })
        .optional(),
      birthday: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birthday should be in YYYY-MM-DD format')
        .optional(),
    },
    {
      message:
        'Create User Payload should be a JSON object that satisfies the API requirements',
    },
  )
  .strict('Unknown fields in create user payload');

export const UpdateUserSchema = CreateUserSchema.partial();

export const QueryParamsUserSchema = getQueryParamsDtoSchema<UserEntity>([
  'email',
]);
