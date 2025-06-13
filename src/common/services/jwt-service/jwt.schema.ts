import { z } from 'zod';

export const JwtEnvSchema = z.object({
  access_ttl: z.coerce.number().min(1),
  refresh_ttl: z.coerce.number().min(1),
  secret: z.string().nonempty(),
});

export const ActiveUserSchema = z.object({
  id: z.coerce.number(),
  email: z.string().nonempty(),
});
