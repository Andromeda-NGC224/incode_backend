import { z } from 'zod';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  QueryParamsTaskSchema,
} from './task.schemas';

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
export type TaskQueryParams = z.infer<typeof QueryParamsTaskSchema>;

export interface TaskFindOptions {
  authorId?: number;
  relations?: string[];
  status?: TaskStatus;
}
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface TaskStatsResponse {
  totalTasks: number;
  tasksByStatus: { status: TaskStatus; count: number }[];
}
