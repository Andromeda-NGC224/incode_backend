import jwt from 'jsonwebtoken';
import { jwtEnvConfig } from './jwt.config';
import { ActiveUser } from 'common/types';
import { ActiveUserSchema } from 'common/services/jwt-service/jwt.schema';

class JwtServiceClass {
  signAccessToken(payload: ActiveUser): string {
    return jwt.sign(payload, jwtEnvConfig.secret, {
      expiresIn: `${jwtEnvConfig.access_ttl}m`,
    });
  }

  signRefreshToken(payload: ActiveUser): string {
    return jwt.sign(payload, jwtEnvConfig.secret, {
      expiresIn: `${jwtEnvConfig.refresh_ttl}m`,
    });
  }

  signTokensPair(payload: ActiveUser) {
    const access_token = this.signAccessToken(payload);
    const refresh_token = this.signRefreshToken(payload);

    return { access_token, refresh_token };
  }

  verify(token: string): ActiveUser {
    try {
      const decoded = jwt.verify(token, jwtEnvConfig.secret);

      return ActiveUserSchema.parse(decoded);
    } catch (_err) {
      throw new Error('Invalid or expired token');
    }
  }
}

export const JwtService = new JwtServiceClass();
