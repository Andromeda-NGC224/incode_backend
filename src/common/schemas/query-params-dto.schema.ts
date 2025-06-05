import { z } from 'zod';
import { SortOrder } from 'common/types';

export const getQueryParamsDtoSchema = <
  T extends readonly [string, ...string[]],
>(
  fields: T,
) =>
  z
    .object({
      search: z.string({ message: 'Search must be a string' }).optional(),
      sortBy: z
        .enum(fields, {
          message: `SortBy must be one of the allowed fields: ${fields}`,
        })
        .optional(),
      order: z
        .nativeEnum(SortOrder, {
          message: `Order must be '${SortOrder.ASC}' or '${SortOrder.DESC}'`,
        })
        .optional(),
    })
    .strict();
