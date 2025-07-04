import { Request, Response } from 'express';
import { AbstractController } from 'common/abstract';
import { JwtService } from 'common/services';

class AuthControllerClass extends AbstractController {
  constructor(private readonly jwtService = JwtService) {
    super();
  }

  refresh(req: Request, res: Response) {
    const { access_token, refresh_token } = this.jwtService.signTokensPair(
      req.user,
    );

    this.setRefreshTokenCookie(res, refresh_token);
    res.json({ access_token });
  }

  logout(_req: Request, res: Response) {
    this.clearRefreshTokenCookie(res);
    res.status(204).send();
  }
}

export const AuthController = new AuthControllerClass();
