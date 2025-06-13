import { JwtEnvSchema } from './jwt.schema';

const parsedEnvConfig = JwtEnvSchema.safeParse({
  access_ttl: process.env.ACCESS_TOKEN_TTL,
  refresh_ttl: process.env.REFRESH_TOKEN_TTL,
  secret: process.env.JWT_SECRET,
});

if (!parsedEnvConfig.success) {
  throw new Error('Invalid JWT environment variables');
}

export const jwtEnvConfig = parsedEnvConfig.data;
