import { z } from 'zod';

export const EmailFieldSchema = z
  .string({ message: 'email is required' })
  .email({ message: 'email is invalid' });
