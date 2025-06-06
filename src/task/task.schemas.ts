import { z } from 'zod';
import { TaskSortableFields } from './task.types';
import { getQueryParamsDtoSchema } from 'common/schemas';

export const CreateTaskSchema = z
  .object(
    {
      title: z
        .string({ message: 'title is required' })
        .min(3, { message: 'min title length is 3' }),
      description: z
        .string({ message: 'description field should be string' })
        .optional(),
      completed: z
        .boolean({ message: 'completed field should be boolean' })
        .optional(),
    },
    {
      message:
        'Create Task Payload should be a JSON object that satisfies the API requirements',
    },
  )
  .strict('Unknown fields in create task payload');

export const UpdateTaskSchema = CreateTaskSchema.partial();

const sortFields = [
  'title',
  'createdAt',
  'completed',
] as const satisfies TaskSortableFields;

export const QueryParamsTaskSchema = getQueryParamsDtoSchema(sortFields);
