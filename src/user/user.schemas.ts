import { z } from 'zod';
import { EmailFieldSchema, getQueryParamsDtoSchema } from 'common/schemas';
import { UserSortableFields } from './user.types';

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
      birthday: z.date({ message: 'birthday should be a date' }).optional(),
    },
    {
      message:
        'Create User Payload should be a JSON object that satisfies the API requirements',
    },
  )
  .strict('Unknown fields in create user payload');

export const UpdateUserSchema = CreateUserSchema.partial();

const sortFields = ['email'] as const satisfies UserSortableFields;

export const QueryParamsUserSchema = getQueryParamsDtoSchema(sortFields);
