import { AppDataSource } from 'database';
import { UserEntity } from './user.entity';
import { buildQueryOptions } from 'common/utils';
import { CreateUserDto, UpdateUserDto } from './user.types';
import {
  Nullable,
  PaginatedResponse,
  QueryParamsDtoSchema,
} from 'common/types';
import { FindOptionsWhere } from 'typeorm';

class UserRepositoryClass {
  constructor(
    private readonly repo = AppDataSource.getRepository(UserEntity),
  ) {}

  async findAll(
    queryParams: QueryParamsDtoSchema,
  ): Promise<PaginatedResponse<UserEntity>> {
    const { skip, take, where, order } = buildQueryOptions<UserEntity>(
      queryParams,
      ['email'],
    );

    const [data, total] = await this.repo.findAndCount({
      where,
      order,
      skip,
      take,
    });

    return { data, total };
  }

  create(data: CreateUserDto): Promise<UserEntity> {
    const created = this.repo.create(data);
    return this.repo.save(created);
  }

  findOne<Key extends keyof UserEntity, Value = UserEntity[Key]>(
    key: Key,
    value: Value,
    relations?: string[],
  ): Promise<Nullable<UserEntity>> {
    return this.repo.findOne({
      where: { [key]: value } as FindOptionsWhere<UserEntity>,
      relations,
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<Nullable<UserEntity>> {
    const existing = await this.repo.preload({ id, ...data });
    if (!existing) return null;

    return this.repo.save(existing);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export const UserRepository = new UserRepositoryClass();
