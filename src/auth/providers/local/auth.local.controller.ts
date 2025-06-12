import { Response } from 'express';
import { TypedRequest } from 'common/types';
import { AbstractController } from 'common/abstract';
import { LoginLocalDto, RegisterLocalDto } from './auth.local.types';
import { AuthLocalService } from './auth.local.service';

class AuthLocalControllerClass extends AbstractController {
  constructor(private readonly authService = AuthLocalService) {
    super();
  }

  async login(req: TypedRequest<{ body: LoginLocalDto }>, res: Response) {
    const { access_token, refresh_token } = await this.authService.login(
      req.body,
    );

    this.setRefreshTokenCookie(res, refresh_token);
    res.json({ access_token });
  }

  async register(req: TypedRequest<{ body: RegisterLocalDto }>, res: Response) {
    const { access_token, refresh_token } = await this.authService.register(
      req.body,
    );

    this.setRefreshTokenCookie(res, refresh_token);
    res.json({ access_token });
  }
}

export const AuthLocalController = new AuthLocalControllerClass();
