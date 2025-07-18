import { Response } from 'express';
// task
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.types';
// common
import { TypedRequest } from 'common/types';
import { AbstractController } from 'common/abstract';

class TaskControllerClass extends AbstractController {
  constructor(private readonly taskService = TaskService) {
    super();
  }

  async getAll(req: TypedRequest, res: Response) {
    const tasks = await this.taskService.findAll(req.validatedQuery!, req.user);
    res.json(tasks);
  }

  async getById(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    const task = await this.taskService.findOne(req.params.id, req.user);
    res.json(task);
  }

  async create(req: TypedRequest<{ body: CreateTaskDto }>, res: Response) {
    const task = await this.taskService.create(req.body, req.user);
    res.status(201).json(task);
  }

  async update(
    req: TypedRequest<{ params: { id: number }; body: UpdateTaskDto }>,
    res: Response,
  ) {
    const updated = await this.taskService.update(
      req.params.id,
      req.body,
      req.user,
    );
    res.json(updated);
  }

  async delete(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    const result = await this.taskService.delete(req.params.id, req.user);
    res.json(result);
  }

  async getTasksStats(req: TypedRequest, res: Response) {
    const stats = await this.taskService.getTasksStats(req.user);
    res.json(stats);
  }
}

export const TaskController = new TaskControllerClass();
