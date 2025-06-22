import { AppDataSource } from 'database';
import { FindOptionsWhere } from 'typeorm';
// task
import { TaskEntity } from './task.entity';
import { CreateTaskDto, TaskFindOptions } from './task.types';
// common
import {
  Nullable,
  PaginatedResponse,
  QueryParamsDtoSchema,
} from 'common/types';
import { buildQueryOptions } from 'common/utils';

class TaskRepositoryClass {
  constructor(
    private readonly repo = AppDataSource.getRepository(TaskEntity),
  ) {}

  async findAll(
    queryParams: QueryParamsDtoSchema,
    options?: TaskFindOptions,
  ): Promise<PaginatedResponse<TaskEntity>> {
    const { skip, take, where, order } = buildQueryOptions<TaskEntity>(
      queryParams,
      ['title', 'description'],
    );

    if (options?.authorId) {
      where.push({ authorId: options.authorId });
    }

    const [data, total] = await this.repo.findAndCount({
      where,
      order,
      skip,
      take,
      relations: options?.relations,
    });

    return { data, total };
  }

  create(data: CreateTaskDto, authorId: number): Promise<TaskEntity> {
    const created = this.repo.create({ ...data, authorId });
    return this.repo.save(created);
  }

  findOne(
    id: number,
    options?: TaskFindOptions,
  ): Promise<Nullable<TaskEntity>> {
    const where: FindOptionsWhere<TaskEntity> = { id };

    if (options?.authorId) {
      where.authorId = options.authorId;
    }

    return this.repo.findOne({ where, relations: options?.relations });
  }

  async update(task: TaskEntity): Promise<TaskEntity | null> {
    return this.repo.save(task);
  }

  delete(id: number, authorId: number) {
    return this.repo.delete({ id, authorId });
  }
}

export const TaskRepository = new TaskRepositoryClass();
