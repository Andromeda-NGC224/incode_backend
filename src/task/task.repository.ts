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
  }: QueryParamsTaskDto): Promise<TaskEntity[]> {
    const where = search
      ? [{ title: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }]
      : undefined;

    const orderBy =
      sortBy && order ? { [sortBy]: order.toUpperCase() } : undefined;

    return this.repo.find({ where, order: orderBy });
  }

  create(data: CreateTaskDto): Promise<TaskEntity> {
    const created = this.repo.create(data);
    return this.repo.save(created);
  }

  findOne(id: number): Promise<Nullable<TaskEntity>> {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: UpdateTaskDto): Promise<TaskEntity | undefined> {
    return this.repo.preload({ id, ...data });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}

export const TaskRepository = new TaskRepositoryClass();
