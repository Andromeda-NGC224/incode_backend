import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from 'common/exceptions';
import { JwtService } from 'common/services';

export function refreshTokenMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token is missing');
  }

  try {
    req.user = JwtService.verify(refreshToken);
    next();
  } catch {
    throw new UnauthorizedException();
  }
}
