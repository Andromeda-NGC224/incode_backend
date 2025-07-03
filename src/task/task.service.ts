import { TaskEntity } from './task.entity';
// task
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto, TaskQueryParams } from './task.types';
// common
import { ActiveUser, MessageResponse } from 'common/types';
import {
  NotFoundException,
  InternalServerErrorException,
} from 'common/exceptions';

export class TaskServiceClass {
  constructor(private readonly taskRepository = TaskRepository) {}

  findAll(query: TaskQueryParams, activeUser: ActiveUser) {
    const { filter, ...queryParams } = query;

    return this.taskRepository.findAll(queryParams, {
      authorId: activeUser.id,
      status: filter,
    });
  }

  async findOne(id: number, activeUser: ActiveUser): Promise<TaskEntity> {
    const candidate = await this.taskRepository.findOne(id, {
      authorId: activeUser.id,
      relations: ['author'],
    });

    if (!candidate) {
      throw new NotFoundException('Can not find task with this id');
    }

    return candidate;
  }

  create(data: CreateTaskDto, activeUser: ActiveUser): Promise<TaskEntity> {
    return this.taskRepository.create(data, activeUser.id);
  }

  async update(
    id: number,
    data: UpdateTaskDto,
    activeUser: ActiveUser,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id, {
      authorId: activeUser.id,
    });
    if (!task) throw new NotFoundException('Can not find task with this id');

    const modified = { ...task, ...data };

    const updated = await this.taskRepository.update(modified);
    if (!updated) {
      throw new InternalServerErrorException(
        'Can not update task with this id',
      );
    }

    return updated;
  }

  async delete(id: number, activeUser: ActiveUser): Promise<MessageResponse> {
    const deleteResult = await this.taskRepository.delete(id, activeUser.id);
    if (!deleteResult.affected)
      throw new NotFoundException('Can not find task with this id');

    return { message: 'Task successfully deleted' };
  }

  async getTasksStats(activeUser: ActiveUser) {
    return this.taskRepository.getTasksStats(activeUser.id);
  }
}

export const TaskService = new TaskServiceClass();
