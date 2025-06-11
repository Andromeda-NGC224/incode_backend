import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './crypto.config';

class CryptoServiceClass {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}

export const CryptoService = new CryptoServiceClass();
