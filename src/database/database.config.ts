import { z } from 'zod';

const databaseEnvSchema = z.object({
  username: z.string(),
  password: z.string(),
  database: z.string(),
  host: z.string(),
  port: z.coerce.number(),
});

const parsedEnvConfig = databaseEnvSchema.safeParse({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
});

if (!parsedEnvConfig.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnvConfig.error.format(),
  );
  process.exit(1);
}

export const databaseEnvConfig = parsedEnvConfig.data;
