import { autobind } from 'common/utils';
import { Response } from 'express';

export abstract class AbstractController {
  protected constructor() {
    autobind(this);
  }

  setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  clearRefreshTokenCookie(res: Response) {
    res.clearCookie('refresh_token');
  }
}
