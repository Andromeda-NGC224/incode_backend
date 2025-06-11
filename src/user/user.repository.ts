import { FindOptionsOrder, FindOptionsWhere, ILike } from 'typeorm';
import { UserEntity } from './user.entity';
import { Maybe, Nullable, SortOrder } from 'common/types';
import { AppDataSource } from 'database';
import { CreateUserDto, QueryParamsUserDto, UpdateUserDto } from './user.types';

class UserRepositoryClass {
  constructor(
    private readonly repo = AppDataSource.getRepository(UserEntity),
  ) {}

  findAll({
    search,
    sortBy,
    order,
    page = 1,
    per_page = 10,
  }: QueryParamsUserDto): Promise<{
    data: UserEntity[];
    total: number;
    page: number;
    per_page: number;
  }> {
    let where: Maybe<FindOptionsWhere<UserEntity>>;
    if (search) {
      where = { email: ILike(`%${search}%`) };
    }

    let orderBy: Maybe<FindOptionsOrder<UserEntity>>;
    if (sortBy && order) {
      orderBy = { [sortBy]: order.toUpperCase() as SortOrder };
    }

    return this.repo
      .findAndCount({
        where,
        order: orderBy,
        skip: (page - 1) * per_page,
        take: per_page,
      })
      .then(([data, total]) => ({ data, total, page, per_page }));
  }

  create(data: CreateUserDto): Promise<UserEntity> {
    const created = this.repo.create(data);
    return this.repo.save(created);
  }

  findOne<Key extends keyof UserEntity, Value = UserEntity[Key]>(
    key: Key,
    value: Value,
  ): Promise<Nullable<UserEntity>> {
    return this.repo.findOneBy({ [key]: value });
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
