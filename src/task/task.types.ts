import { z } from 'zod';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  QueryParamsTaskSchema,
} from './task.schemas';
import { TaskEntity } from './task.entity';

export type TaskSortableFields = TaskEntity[
  | 'title'
  | 'createdAt'
  | 'completed'][];

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
export type QueryParamsTaskDto = z.infer<typeof QueryParamsTaskSchema>;
