import { z } from 'zod';
import { SortOrder } from 'common/types';

export const getQueryParamsDtoSchema = <EntityType, Key = keyof EntityType>(
  fields: Key[],
) =>
  z
    .object({
      search: z.string({ message: 'Search must be a string' }).optional(),
      sortBy: z
        .enum(fields as unknown as [string, ...string[]], {
          message: `SortBy must be one of the allowed fields: ${fields}`,
        })
        .optional(),
      order: z
        .nativeEnum(SortOrder, {
          message: `Order must be '${SortOrder.ASC}' or '${SortOrder.DESC}'`,
        })
        .optional(),
      page: z.coerce
        .number({
          invalid_type_error: 'Page must be a number',
        })
        .int('Page must be an integer')
        .positive('Page must be a positive number')
        .optional()
        .default(1),
      per_page: z.coerce
        .number({
          invalid_type_error: 'per_page must be a number',
        })
        .int('per_page must be an integer')
        .positive('per_page must be a positive number')
        .optional()
        .default(10),
    })
    .strict({ message: 'Unknown fields in query params' });

export const _dummyQueryParamsDtoSchema = getQueryParamsDtoSchema<never>([
  'id',
]);
