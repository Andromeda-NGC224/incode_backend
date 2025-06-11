import { UserRepository } from './user.repository';
import { QueryParamsUserDto } from 'user/user.types';
import { NotFoundException } from 'common/exceptions';
import { UserEntity } from 'user/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.types';
import { MessageResponse } from 'common/types';
import { CryptoService } from 'common/services';

class UserServiceClass {
  constructor(
    private readonly cryptoService = CryptoService,
    private readonly userRepository = UserRepository,
  ) {}

  getAll(query: QueryParamsUserDto) {
    return this.userRepository.findAll(query);
  }

  async findOne<Key extends keyof UserEntity, Value = UserEntity[Key]>(
    key: Key,
    value: Value,
  ): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne(key, value);
    if (!candidate) {
      throw new NotFoundException(`Can not find user with this ${key}`);
    }

    return candidate;
  }

  async create(data: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const hashedPassword = await this.cryptoService.hash(data.password);

    const createdUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const { password: _, ...user } = createdUser;

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    const updated = await this.userRepository.update(id, data);
    if (!updated) throw new NotFoundException('Can not find user with this id');

    return updated;
  }

  async delete(id: number): Promise<MessageResponse> {
    const deleteResult = await this.userRepository.delete(id);
    if (!deleteResult.affected)
      throw new NotFoundException('Can not find user with this id');

    return { message: 'User successfully deleted' };
  }
}

export const UserService = new UserServiceClass();
