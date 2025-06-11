import { ILike } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Nullable } from 'common/types';
import { AppDataSource } from 'database';
import { CreateTaskDto, QueryParamsTaskDto, UpdateTaskDto } from './task.types';

class TaskRepositoryClass {
  constructor(
    private readonly repo = AppDataSource.getRepository(TaskEntity),
  ) {}

  findAll({
    search,
    sortBy = 'createdAt',
    order,
    page = 1,
    per_page = 10,
  }: QueryParamsTaskDto): Promise<{
    data: TaskEntity[];
    total: number;
    page: number;
    per_page: number;
  }> {
    const where = search
      ? [{ title: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }]
      : undefined;

    const orderBy =
      sortBy && order ? { [sortBy]: order.toUpperCase() } : undefined;

    return this.repo
      .findAndCount({
        where,
        order: orderBy,
        skip: (page - 1) * per_page,
        take: per_page,
      })
      .then(([data, total]) => ({ data, total, page, per_page }));
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
