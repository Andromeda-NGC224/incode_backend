import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from 'common/exceptions';
import { MiddlewareConfig, MiddlewareReturnType } from './types';

export const validateMiddleware =
  <Config extends MiddlewareConfig>(
    config: Config,
  ): MiddlewareReturnType<Config> =>
  (req: Request, _res: Response, next: NextFunction) => {
    Object.entries(config).forEach(([key, schema]) => {
      const location = key as keyof MiddlewareConfig;

      const result = schema!.safeParse(req[location]);

      if (!result.success) {
        const message = result.error.errors[0]?.message || 'Validation failed';
        throw new BadRequestException(message);
      }

      req[location === 'query' ? 'validatedQuery' : location] = result.data;
    });
    next();
  };
