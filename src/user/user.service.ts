import { UserRepository } from './user.repository';
import { NotFoundException } from 'common/exceptions';
import { UserEntity } from 'user/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.types';
import { MessageResponse, QueryParamsDtoSchema } from 'common/types';

class UserServiceClass {
  constructor(private readonly userRepository = UserRepository) {}

  getAll(query: QueryParamsDtoSchema) {
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
    return this.userRepository.create(data);
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
