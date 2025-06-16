import { AppDataSource } from 'database';
import { TaskEntity } from './task.entity';
import { buildQueryOptions } from 'common/utils';
import { CreateTaskDto, UpdateTaskDto } from './task.types';
import {
  Nullable,
  PaginatedResponse,
  QueryParamsDtoSchema,
} from 'common/types';

class TaskRepositoryClass {
  constructor(
    private readonly repo = AppDataSource.getRepository(TaskEntity),
  ) {}

  async findAll(
    queryParams: QueryParamsDtoSchema,
  ): Promise<PaginatedResponse<TaskEntity>> {
    const { skip, take, where, order } = buildQueryOptions<TaskEntity>(
      queryParams,
      ['title', 'description'],
    );

    const [data, total] = await this.repo.findAndCount({
      where,
      order,
      skip,
      take,
    });

    return { data, total };
  }

  create(data: CreateTaskDto): Promise<TaskEntity> {
    const created = this.repo.create(data);
    return this.repo.save(created);
  }

  findOne(id: number): Promise<Nullable<TaskEntity>> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: UpdateTaskDto): Promise<TaskEntity | null> {
    const updatedTask = await this.repo.preload({ id, ...data });
    if (!updatedTask) return null;

    return this.repo.save(updatedTask);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export const TaskRepository = new TaskRepositoryClass();
