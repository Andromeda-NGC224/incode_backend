import { z } from 'zod';

export const ParseIntSchema = (key: string = 'id') =>
  z.object({
    [key]: z.coerce
      .number({
        invalid_type_error: `${key} must be a number`,
        required_error: `${key} is required`,
      })
      .int(`${key} must be an integer`)
      .positive(`${key} must be a positive number`),
  });
