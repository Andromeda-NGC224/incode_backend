import { AppDataSource } from 'database';
import { AuthEntity } from './auth.entity';
import { AuthProvider } from './auth.types';
import { FindOptionsWhere } from 'typeorm';

export class AuthRepositoryClass {
  constructor(
    private readonly authRepository = AppDataSource.getRepository(AuthEntity),
  ) {}

  findByEmailAndProvider(
    email: string,
    provider: AuthProvider,
  ): Promise<AuthEntity | null> {
    return this.authRepository.findOne({
      where: { email, provider } as FindOptionsWhere<AuthEntity>,
      relations: ['user'],
    });
  }

  create(data: Partial<AuthEntity>): Promise<AuthEntity> {
    const entity = this.authRepository.create(data);
    return this.authRepository.save(entity);
  }

  findAllByUser(userId: number): Promise<AuthEntity[]> {
    return this.authRepository.find({
      where: { user: { id: userId } },
    });
  }
}

export const AuthRepository = new AuthRepositoryClass();
