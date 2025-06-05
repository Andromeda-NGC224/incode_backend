import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'common/exceptions';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  const isHttpException = error instanceof HttpException;
  if (!isHttpException) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  res
    .status(error.statusCode)
    .json({ message: error.message, statusCode: error.statusCode });
};
