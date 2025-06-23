import { z } from 'zod';
import { CreateTaskSchema, UpdateTaskSchema } from './task.schemas';

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;

export interface TaskFindOptions {
  authorId?: number;
  relations?: string[];
}
