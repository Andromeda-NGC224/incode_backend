import { z } from 'zod';
import { _dummyQueryParamsDtoSchema } from 'common/schemas';

// ! ENUMS
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface MessageResponse {
  message: string;
}

export interface ActiveUser {
  id: number;
  email: string;
}

export type QueryParamsDtoSchema = z.infer<typeof _dummyQueryParamsDtoSchema>;
