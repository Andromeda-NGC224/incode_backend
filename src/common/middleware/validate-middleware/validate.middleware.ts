import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from 'common/exceptions';
import { MiddlewareConfig, MiddlewareReturnType } from './types';

export const validateMiddleware =
  <Config extends MiddlewareConfig>(
    config: Config,
  ): MiddlewareReturnType<Config> =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validatedData: Partial<Record<keyof MiddlewareConfig, unknown>> = {};
    Object.entries(config).forEach(([key, schema]) => {
      const location = key as keyof MiddlewareConfig;

      const result = schema!.safeParse(req[location]);

      if (!result.success) {
        const message = result.error.errors[0]?.message || 'Validation failed';
        throw new BadRequestException(message);
      }
      // We replace the object so that the uptream chendlers can see already sparse values

      validatedData[location] = result.data;
    });

    Object.assign(_res.locals, validatedData);

    next();
  };
