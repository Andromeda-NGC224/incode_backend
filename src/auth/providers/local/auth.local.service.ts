// auth
import { AuthProvider } from 'auth/auth.types';
import { AuthRepository } from 'auth/auth.repository';
import { LoginLocalDto, RegisterLocalDto } from './auth.local.types';
// common
import { ActiveUser } from 'common/types';
import { BadRequestException, UnauthorizedException } from 'common/exceptions';
import { CryptoService, JwtService } from 'common/services';
// user
import { UserRepository } from 'user/user.repository';

class AuthLocalServiceClass {
  constructor(
    private readonly jwtService = JwtService,
    private readonly cryptoService = CryptoService,
    private readonly authRepository = AuthRepository,
    private readonly userRepository = UserRepository,
  ) {}

  async login(data: LoginLocalDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const auth = await this.authRepository.findByEmailAndProvider(
      data.email,
      AuthProvider.LOCAL,
    );

    if (!auth || !auth.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await this.cryptoService.compare(
      data.password,
      auth.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const activeUser: ActiveUser = { id: auth.user.id, email: auth.user.email };

    return this.jwtService.signTokensPair(activeUser);
  }

  async register(data: RegisterLocalDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const existing = await this.authRepository.findByEmailAndProvider(
      data.email,
      AuthProvider.LOCAL,
    );

    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await this.cryptoService.hash(data.password);

    const user = await this.userRepository.create({
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      email: data.email,
    });

    await this.authRepository.create({
      provider: AuthProvider.LOCAL,
      email: data.email,
      password: hashedPassword,
      user,
    });

    const activeUser: ActiveUser = { id: user.id, email: user.email };

    return this.jwtService.signTokensPair(activeUser);
  }
}

export const AuthLocalService = new AuthLocalServiceClass();
