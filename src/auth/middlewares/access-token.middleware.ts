import { NextFunction, Request, Response } from 'express';
import { JwtService } from 'common/services';
import { UnauthorizedException } from 'common/exceptions';

export function accessTokenMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException(
      'Authorization header is missing or invalid',
    );
  }

  const [, access_token] = authHeader.split(' ');

  if (!access_token) {
    throw new UnauthorizedException('Access token is missing');
  }

  try {
    req.user = JwtService.verify(access_token);
    next();
  } catch (_err) {
    throw new UnauthorizedException();
  }
}
