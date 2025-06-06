import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto, QueryParamsTaskDto, UpdateTaskDto } from './task.types';
import { TypedRequest } from 'common/types';
import { AbstractController } from 'common/abstract';

class TaskControllerClass extends AbstractController {
  constructor(private readonly taskService = TaskService) {
    super();
  }

  async getAll(
    _req: TypedRequest<{ query: QueryParamsTaskDto }>,
    res: Response,
  ) {
    const task = await this.taskService.findAll(res.locals.query);
    res.json(task);
  }

  async getById(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    console.log('req.params.id: ', typeof req.params.id);
    const task = await this.taskService.findOne(req.params.id);
    res.json(task);
  }

  async create(req: TypedRequest<{ body: CreateTaskDto }>, res: Response) {
    const task = await this.taskService.create(req.body);
    res.status(201).json(task);
  }

  async update(
    req: TypedRequest<{ params: { id: number }; body: UpdateTaskDto }>,
    res: Response,
  ) {
    const updated = await this.taskService.update(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: TypedRequest<{ params: { id: number } }>, res: Response) {
    const result = await this.taskService.delete(req.params.id);
    res.json(result);
  }
}

export const TaskController = new TaskControllerClass();
