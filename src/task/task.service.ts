import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from './task.types';
import { MessageResponse, QueryParamsDtoSchema } from 'common/types';
import { NotFoundException } from 'common/exceptions';

export class TaskServiceClass {
  constructor(private readonly taskRepository = TaskRepository) {}

  findAll(query: QueryParamsDtoSchema) {
    return this.taskRepository.findAll(query);
  }

  async findOne(id: number): Promise<TaskEntity> {
    const candidate = await this.taskRepository.findOne(id);
    if (!candidate) {
      throw new NotFoundException('Can not find task with this id');
    }

    return candidate;
  }

  create(data: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.create(data);
  }

  async update(id: number, data: UpdateTaskDto): Promise<TaskEntity> {
    const updated = await this.taskRepository.update(id, data);
    if (!updated) throw new NotFoundException('Can not find task with this id');

    return updated;
  }

  async delete(id: number): Promise<MessageResponse> {
    const deleteResult = await this.taskRepository.delete(id);
    if (!deleteResult.affected)
      throw new NotFoundException('Can not find task with this id');

    return { message: 'Task successfully deleted' };
  }
}

export const TaskService = new TaskServiceClass();
