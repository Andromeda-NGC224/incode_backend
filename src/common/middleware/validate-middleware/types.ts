import { z, ZodSchema } from 'zod';
import { RequestHandler } from 'express';

type MiddlewareLocations = 'params' | 'body' | 'query';

export type MiddlewareConfig = Partial<Record<MiddlewareLocations, ZodSchema>>;

type InferZod<MaybeZodSchema> = MaybeZodSchema extends ZodSchema
  ? z.infer<MaybeZodSchema>
  : unknown;

export type MiddlewareReturnType<Config extends MiddlewareConfig> =
  RequestHandler<
    InferZod<Config['params']>,
    unknown,
    InferZod<Config['body']>,
    InferZod<Config['query']>
  >;
